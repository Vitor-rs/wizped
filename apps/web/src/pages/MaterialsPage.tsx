import { Card, CardContent, CardHeader, CardTitle } from '@workspace/ui/components/card'
import { Badge } from '@workspace/ui/components/badge'
import { Separator } from '@workspace/ui/components/separator'
import { wizardEnglishStarterTemplates } from '@/modules/materials/wizardMaterialsSchema'

export function MaterialsPage() {
  const templates = wizardEnglishStarterTemplates

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-lg font-semibold">Materiais Didáticos</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Módulo flexível para estágios/livros, lições, kits, itens de estoque e conexões para grafo de conteúdo.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Templates de Estágio (NoSQL-ready)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {templates.map((stage) => (
            <div key={stage.id} className="space-y-2 rounded-md border p-3">
              <div className="flex items-center justify-between">
                <p className="font-medium">
                  {stage.title} ({stage.code}) · Edição {stage.editionYear}
                </p>
                <Badge>{stage.courseTrack}</Badge>
              </div>

              <p className="text-muted-foreground text-sm">
                Capítulos: {stage.chapterStructure.chapterCount} · Estrutura: {stage.chapterStructure.lessonPairsPerChapter * 2} lições + review
              </p>

              <div className="flex flex-wrap gap-2">
                {stage.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>

              <Separator />

              <p className="text-xs text-muted-foreground">
                CEFR: {stage.cefrBand ?? 'n/d'} · GSE: {stage.gseRange?.min ?? '-'}-{stage.gseRange?.max ?? '-'} · Wiz.me:{' '}
                {stage.appSupport.wizMe ? 'sim' : 'não'} · Wiz.pen: {stage.appSupport.wizPen ? 'sim' : 'não'}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
