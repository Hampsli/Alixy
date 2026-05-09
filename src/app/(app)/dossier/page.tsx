'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/Card';
import { Button } from '@/components/Button';
import { Badge } from '@/components/Badge';
import { Avatar } from '@/components/Avatar';
import { useApp } from '@/context/AppContext';
import { Download, TrendingUp, Users, Target, CheckCircle2 } from 'lucide-react';

export default function DossierPage() {
  const { user, achievements } = useApp();
  const quarter = 'Q2';
  const year = '2026';

  const featuredAchievements = achievements.filter((a) => a.featured);
  const curatedAchievements = achievements.filter((a) => a.status === 'curated');

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold mb-2">Dossier Trimestral</h1>
          <p className="text-muted-foreground">
            {quarter} {year} — Reporte ejecutivo verificado
          </p>
        </div>
        <Button size="lg">
          <Download className="h-5 w-5" />
          Exportar PDF
        </Button>
      </div>

      <Card variant="purple" className="relative overflow-hidden">
        <div className="flex items-center gap-4">
          <Avatar
            src={user?.avatar}
            fallback={user?.name?.split(' ').map((n) => n[0]).join('') || 'LT'}
            size="lg"
          />
          <div className="flex-1">
            <h2 className="text-2xl font-semibold text-white mb-1">{user?.name}</h2>
            <p className="text-white/90 mb-2">{user?.role}</p>
            <Badge variant="verified" className="bg-white/20 text-white">
              Verificado por María González
            </Badge>
          </div>
        </div>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Impacto Estratégico</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-semibold mb-1">{curatedAchievements.length}</p>
                <p className="text-sm text-muted-foreground">Logros verificados</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-[var(--success)]/10">
                <Users className="h-5 w-5 text-[var(--success)]" />
              </div>
              <div>
                <p className="text-2xl font-semibold mb-1">3</p>
                <p className="text-sm text-muted-foreground">Equipos impactados</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-accent/20">
                <Target className="h-5 w-5 text-accent-foreground" />
              </div>
              <div>
                <p className="text-2xl font-semibold mb-1">40%</p>
                <p className="text-sm text-muted-foreground">Mejora en eficiencia</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Logros Destacados</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {featuredAchievements.map((achievement, idx) => (
            <div
              key={achievement.id}
              className="flex items-start gap-3 pb-4 border-b border-border last:border-0 last:pb-0"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold text-sm shrink-0">
                {idx + 1}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold mb-1">{achievement.title}</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  {achievement.description}
                </p>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      achievement.type === 'strategic'
                        ? 'strategic'
                        : achievement.type === 'process'
                        ? 'process'
                        : 'support'
                    }
                  >
                    {achievement.type}
                  </Badge>
                  {achievement.evidences.length > 0 && (
                    <span className="text-xs text-muted-foreground">
                      {achievement.evidences.length} evidencia(s)
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Testimonios de Stakeholders</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-l-4 border-primary pl-4 py-2">
            <p className="text-muted-foreground italic mb-3">
              "Liliana transformó la forma en que nuestros equipos colaboran. Su mediación
              fue clave para el éxito del proyecto."
            </p>
            <div className="flex items-center gap-2">
              <Avatar size="sm" fallback="JM" />
              <div>
                <p className="text-sm font-medium">Juan Martínez</p>
                <p className="text-xs text-muted-foreground">Tech Lead, Backend</p>
              </div>
            </div>
          </div>

          <div className="border-l-4 border-[var(--success)] pl-4 py-2">
            <p className="text-muted-foreground italic mb-3">
              "El proceso de code review mejoró radicalmente. Ahora es más rápido y
              detectamos más issues temprano."
            </p>
            <div className="flex items-center gap-2">
              <Avatar size="sm" fallback="AS" />
              <div>
                <p className="text-sm font-medium">Ana Silva</p>
                <p className="text-xs text-muted-foreground">Engineering Manager</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            Próximos Pasos — {quarter} {year}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" className="mt-1 rounded border-border" />
            <div>
              <p className="font-medium">Liderar iniciativa de arquitectura distribuida</p>
              <p className="text-sm text-muted-foreground">
                Diseñar roadmap para migración a microservicios
              </p>
            </div>
          </label>
          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" className="mt-1 rounded border-border" />
            <div>
              <p className="font-medium">Mentorar a 2 engineers hacia senior level</p>
              <p className="text-sm text-muted-foreground">Programa estructurado de 6 meses</p>
            </div>
          </label>
          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" defaultChecked className="mt-1 rounded border-border" />
            <div>
              <p className="font-medium">Presentar en conferencia técnica</p>
              <p className="text-sm text-muted-foreground">
                Compartir aprendizajes sobre optimización de procesos
              </p>
            </div>
          </label>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between pt-6 border-t border-border">
        <p className="text-sm text-muted-foreground">
          Generado el{' '}
          {new Date().toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-[var(--success)]" />
          <p className="text-sm text-muted-foreground">
            Verificado por María González, Curadora Certificada
          </p>
        </div>
      </div>
    </div>
  );
}
