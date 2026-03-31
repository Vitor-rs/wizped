import { useState } from "react"
import { Button } from "@workspace/ui/components/button"
import { Card } from "@workspace/ui/components/card"
import { Input } from "@workspace/ui/components/input"
import { useAuthStore } from "@/stores/useAuthStore"

export function LoginForm() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { loginWithEmail, loginWithGoogle, isLoading, error, clearError } =
        useAuthStore()

    async function handleEmailLogin(e: React.FormEvent) {
        e.preventDefault()
        await loginWithEmail(email, password)
    }

    return (
        <div className="flex min-h-svh items-center justify-center p-4">
            <Card className="w-full max-w-sm p-6">
                <div className="mb-6 text-center">
                    <h1 className="text-lg font-semibold">Wizped</h1>
                    <p className="text-muted-foreground text-sm">
                        Faça login para continuar
                    </p>
                </div>

                <form onSubmit={handleEmailLogin} className="flex flex-col gap-3">
                    <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                            clearError()
                        }}
                        required
                    />
                    <Input
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value)
                            clearError()
                        }}
                        required
                    />

                    {error && (
                        <p className="text-destructive text-xs">{error}</p>
                    )}

                    <Button type="submit" disabled={isLoading} className="mt-1">
                        {isLoading ? "Entrando..." : "Entrar"}
                    </Button>
                </form>

                {/* Separador visual entre os dois métodos de login */}
                <div className="my-4 flex items-center gap-3">
                    <div className="bg-border h-px flex-1" />
                    <span className="text-muted-foreground text-xs">ou</span>
                    <div className="bg-border h-px flex-1" />
                </div>

                <Button
                    variant="outline"
                    className="w-full"
                    onClick={loginWithGoogle}
                    disabled={isLoading}
                >
                    Entrar com Google
                </Button>
            </Card>
        </div>
    )
}