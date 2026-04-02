// apps/web/src/pages/DrivePage.tsx
import { useEffect, useState, useCallback } from "react"
import { googleApi } from "@/services/googleApi"
import { useAuthStore } from "@/stores/useAuthStore"
import { Button } from "@workspace/ui/components/button"
import { Card } from "@workspace/ui/components/card"
import { Input } from "@workspace/ui/components/input"

/* eslint-disable @typescript-eslint/no-explicit-any */
type DriveFile = Record<string, any>
/* eslint-enable @typescript-eslint/no-explicit-any */

// Ícones por tipo de arquivo
const MIME_ICONS: Record<string, string> = {
    "application/vnd.google-apps.folder": "📁",
    "application/vnd.google-apps.document": "📄",
    "application/vnd.google-apps.spreadsheet": "📊",
    "application/vnd.google-apps.presentation": "📽️",
    "application/vnd.google-apps.form": "📋",
    "application/pdf": "📕",
    "image/jpeg": "🖼️",
    "image/png": "🖼️",
    "image/gif": "🖼️",
    "image/webp": "🖼️",
    "video/mp4": "🎬",
    "audio/mpeg": "🎵",
    "text/plain": "📝",
    "text/csv": "📊",
    "application/zip": "📦",
}

function getMimeIcon(mimeType: string): string {
    return MIME_ICONS[mimeType] ?? "📄"
}

function formatFileSize(bytes: string | undefined): string {
    if (!bytes) return "—"
    const b = parseInt(bytes, 10)
    if (b < 1024) return `${b} B`
    if (b < 1024 * 1024) return `${(b / 1024).toFixed(1)} KB`
    if (b < 1024 * 1024 * 1024) return `${(b / (1024 * 1024)).toFixed(1)} MB`
    return `${(b / (1024 * 1024 * 1024)).toFixed(1)} GB`
}

function formatDate(dateStr: string | undefined): string {
    if (!dateStr) return "—"
    return new Date(dateStr).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    })
}

// Google Picker loader
let pickerLoaded = false
function loadPickerScript(): Promise<void> {
    return new Promise((resolve, reject) => {
        if (pickerLoaded) {
            resolve()
            return
        }
        // Check if gapi already exists
        if (window.gapi?.load) {
            window.gapi.load("picker", () => {
                pickerLoaded = true
                resolve()
            })
            return
        }
        const script = document.createElement("script")
        script.src = "https://apis.google.com/js/api.js"
        script.onload = () => {
            window.gapi.load("picker", () => {
                pickerLoaded = true
                resolve()
            })
        }
        script.onerror = () => reject(new Error("Falha ao carregar Google Picker"))
        document.head.appendChild(script)
    })
}

export function DrivePage() {
    const { accessToken } = useAuthStore()
    const [files, setFiles] = useState<DriveFile[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedFile, setSelectedFile] = useState<DriveFile | null>(null)
    const [detailLoading, setDetailLoading] = useState(false)

    const fetchFiles = useCallback(async (query?: string) => {
        setLoading(true)
        setError(null)
        try {
            const q = query
                ? `name contains '${query}' and trashed=false`
                : "trashed=false"
            const data = (await googleApi.listFiles(q, 50)) as {
                files?: DriveFile[]
            }
            setFiles(data.files ?? [])
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erro ao buscar arquivos")
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        if (accessToken) fetchFiles()
    }, [accessToken, fetchFiles])

    function handleSearch(e: React.FormEvent) {
        e.preventDefault()
        fetchFiles(searchQuery.trim() || undefined)
    }

    async function handleFileClick(file: DriveFile) {
        setDetailLoading(true)
        try {
            const detail = await googleApi.getFile(file.id)
            setSelectedFile(detail as DriveFile)
        } catch {
            setSelectedFile(file)
        } finally {
            setDetailLoading(false)
        }
    }

    async function handleTrash(fileId: string) {
        if (!confirm("Mover este arquivo para a lixeira?")) return
        try {
            await googleApi.trashFile(fileId)
            setSelectedFile(null)
            await fetchFiles(searchQuery.trim() || undefined)
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erro ao mover para lixeira")
        }
    }

    async function handleShareLink(fileId: string) {
        try {
            const result = (await googleApi.createShareableLink(fileId)) as {
                webViewLink: string
            }
            await navigator.clipboard.writeText(result.webViewLink)
            alert("Link copiado para a área de transferência!")
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erro ao gerar link")
        }
    }

    function openPicker() {
        if (!accessToken) return

        const apiKey = import.meta.env.VITE_GOOGLE_API_KEY
        const appId = import.meta.env.VITE_GOOGLE_APP_ID

        if (!apiKey || !appId) {
            setError("VITE_GOOGLE_API_KEY ou VITE_GOOGLE_APP_ID não configurados no .env.local")
            return
        }

        loadPickerScript()
            .then(() => {
                const google = window.google
                const view = new google.picker.DocsView()
                view.setIncludeFolders(true)
                view.setSelectFolderEnabled(false)

                const uploadView = new google.picker.DocsUploadView()

                const picker = new google.picker.PickerBuilder()
                    .addView(view)
                    .addView(uploadView)
                    .setOAuthToken(accessToken)
                    .setDeveloperKey(apiKey)
                    .setAppId(appId)
                    .setTitle("Selecionar arquivo do Google Drive")
                    .setCallback((data: { action: string; docs: { id: string; name: string; mimeType: string; url: string }[] }) => {
                        if (data.action === google.picker.Action.PICKED) {
                            const doc = data.docs[0]
                            // Buscar detalhes completos do arquivo selecionado
                            googleApi
                                .getFile(doc.id)
                                .then((detail) => {
                                    setSelectedFile(detail as DriveFile)
                                    // Recarregar lista para incluir o arquivo (caso seja novo via upload)
                                    fetchFiles(searchQuery.trim() || undefined)
                                })
                                .catch(() => {
                                    // Se falhar o detail, usa o que o Picker retornou
                                    setSelectedFile({
                                        id: doc.id,
                                        name: doc.name,
                                        mimeType: doc.mimeType,
                                        webViewLink: doc.url,
                                    })
                                })
                        }
                    })
                    .build()

                picker.setVisible(true)
            })
            .catch((err) => {
                setError(err instanceof Error ? err.message : "Erro ao abrir Picker")
            })
    }

    if (!accessToken) {
        return (
            <div>
                <h1 className="text-lg font-semibold">Arquivos</h1>
                <p className="text-muted-foreground mt-1 text-sm">
                    Faça login com Google para acessar a Drive API.
                </p>
            </div>
        )
    }

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-lg font-semibold">Google Drive</h1>
                    <p className="text-muted-foreground text-sm">
                        {files.length} arquivo(s)
                        {searchQuery && ` para "${searchQuery}"`}
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button size="sm" onClick={openPicker}>
                        Selecionar do Drive
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open("https://drive.google.com", "_blank")}
                    >
                        Abrir Google Drive
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => fetchFiles(searchQuery.trim() || undefined)}
                        disabled={loading}
                    >
                        {loading ? "..." : "↻"}
                    </Button>
                </div>
            </div>

            {/* Search */}
            <form onSubmit={handleSearch} className="flex gap-2">
                <Input
                    placeholder="Buscar arquivos por nome..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="max-w-sm"
                />
                <Button type="submit" variant="outline" size="sm" disabled={loading}>
                    Buscar
                </Button>
                {searchQuery && (
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                            setSearchQuery("")
                            fetchFiles()
                        }}
                    >
                        Limpar
                    </Button>
                )}
            </form>

            {error && (
                <Card className="border-destructive bg-destructive/10 p-4">
                    <p className="text-destructive text-sm">{error}</p>
                    <Button variant="outline" size="sm" className="mt-2" onClick={() => setError(null)}>
                        Fechar
                    </Button>
                </Card>
            )}

            <div className="flex gap-4">
                {/* File list */}
                <div className="min-w-0 flex-1 space-y-1">
                    {files.map((file) => (
                        <Card
                            key={file.id}
                            className={`cursor-pointer p-3 transition-colors hover:bg-accent/50 ${selectedFile?.id === file.id ? "border-primary bg-accent/30" : ""}`}
                            onClick={() => handleFileClick(file)}
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-lg">{getMimeIcon(file.mimeType)}</span>
                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-medium">{file.name}</p>
                                    <p className="text-muted-foreground text-xs">
                                        {formatDate(file.modifiedTime)} · {formatFileSize(file.size)}
                                    </p>
                                </div>
                                {file.shared && (
                                    <span className="text-muted-foreground text-[10px]">compartilhado</span>
                                )}
                                {file.starred && <span className="text-yellow-500">★</span>}
                            </div>
                        </Card>
                    ))}

                    {!loading && files.length === 0 && !error && (
                        <p className="text-muted-foreground py-8 text-center text-sm">
                            Nenhum arquivo encontrado.
                        </p>
                    )}
                </div>

                {/* File detail panel */}
                {selectedFile && (
                    <Card className="w-80 shrink-0 space-y-3 p-4">
                        {detailLoading ? (
                            <p className="text-muted-foreground text-sm">Carregando detalhes...</p>
                        ) : (
                            <>
                                <div className="text-center">
                                    <span className="text-4xl">{getMimeIcon(selectedFile.mimeType)}</span>
                                    <h3 className="mt-2 text-sm font-semibold">{selectedFile.name}</h3>
                                </div>

                                <div className="text-muted-foreground space-y-1.5 text-xs">
                                    <p>
                                        <span className="font-medium">Tipo:</span> {selectedFile.mimeType}
                                    </p>
                                    {selectedFile.size && (
                                        <p>
                                            <span className="font-medium">Tamanho:</span>{" "}
                                            {formatFileSize(selectedFile.size)}
                                        </p>
                                    )}
                                    <p>
                                        <span className="font-medium">Criado:</span>{" "}
                                        {formatDate(selectedFile.createdTime)}
                                    </p>
                                    <p>
                                        <span className="font-medium">Modificado:</span>{" "}
                                        {formatDate(selectedFile.modifiedTime)}
                                    </p>
                                    {selectedFile.owners?.[0] && (
                                        <p>
                                            <span className="font-medium">Dono:</span>{" "}
                                            {selectedFile.owners[0].displayName ?? selectedFile.owners[0].emailAddress}
                                        </p>
                                    )}
                                    {selectedFile.lastModifyingUser && (
                                        <p>
                                            <span className="font-medium">Última edição:</span>{" "}
                                            {selectedFile.lastModifyingUser.displayName ??
                                                selectedFile.lastModifyingUser.emailAddress}
                                        </p>
                                    )}
                                    {selectedFile.description && (
                                        <p>
                                            <span className="font-medium">Descrição:</span>{" "}
                                            {selectedFile.description}
                                        </p>
                                    )}
                                    {selectedFile.fileExtension && (
                                        <p>
                                            <span className="font-medium">Extensão:</span>{" "}
                                            .{selectedFile.fileExtension}
                                        </p>
                                    )}
                                    <p className="text-[10px]">ID: {selectedFile.id}</p>
                                </div>

                                <div className="space-y-1.5">
                                    {selectedFile.webViewLink && (
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="w-full"
                                            onClick={() => window.open(selectedFile.webViewLink, "_blank")}
                                        >
                                            Abrir no Google
                                        </Button>
                                    )}
                                    {selectedFile.webContentLink && (
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="w-full"
                                            onClick={() => window.open(selectedFile.webContentLink, "_blank")}
                                        >
                                            Download
                                        </Button>
                                    )}
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="w-full"
                                        onClick={() => handleShareLink(selectedFile.id)}
                                    >
                                        Copiar link público
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="destructive"
                                        className="w-full"
                                        onClick={() => handleTrash(selectedFile.id)}
                                    >
                                        Mover para lixeira
                                    </Button>
                                </div>

                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="w-full"
                                    onClick={() => setSelectedFile(null)}
                                >
                                    Fechar
                                </Button>
                            </>
                        )}
                    </Card>
                )}
            </div>
        </div>
    )
}

// Tipos globais para o Google Picker
/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
    interface Window {
        gapi: any
        google: any
    }
}
/* eslint-enable @typescript-eslint/no-explicit-any */