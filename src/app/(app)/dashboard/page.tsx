'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/Card';
import { Button } from '@/components/Button';
import { Badge } from '@/components/Badge';
import { useApp } from '@/context/AppContext';
import { Handshake, Settings, FileUp, TrendingUp, Award, CheckCircle2 } from 'lucide-react';

export default function DashboardPage() {
  const { user, achievements } = useApp();
  const router = useRouter();
  const [showUploadModal, setShowUploadModal] = useState(false);

  const stats = {
    totalAchievements: achievements.length,
    withEvidence: achievements.filter((a) => a.evidences.length > 0).length,
    milestones: achievements.filter((a) => a.featured).length,
  };

  const evidencePercentage = stats.totalAchievements
    ? Math.round((stats.withEvidence / stats.totalAchievements) * 100)
    : 0;

  const quickImpactButtons = [
    {
      icon: Handshake,
      label: 'Resolví un Conflicto',
      type: 'conflict' as const,
      color: 'bg-primary/10 text-primary hover:bg-primary/20',
    },
    {
      icon: Settings,
      label: 'Optimicé un Proceso',
      type: 'process' as const,
      color:
        'bg-[var(--warning)]/10 text-[var(--warning)] hover:bg-[var(--warning)]/20',
    },
    {
      icon: Award,
      label: 'Apoyé a una Compañera',
      type: 'support' as const,
      color:
        'bg-[var(--success)]/10 text-[var(--success)] hover:bg-[var(--success)]/20',
    },
  ];

  const handleQuickImpact = (type: string) => {
    router.push(`/bitacora?new=${type}`);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <Card variant="purple" className="relative overflow-hidden">
        <div className="absolute right-0 top-0 h-full w-1/3 opacity-10">
          <svg viewBox="0 0 200 200" className="h-full w-full">
            <circle cx="100" cy="100" r="80" fill="currentColor" />
          </svg>
        </div>
        <div className="relative z-10">
          <Badge variant="verified" className="mb-3 bg-white/20 text-white">
            {new Date().toLocaleDateString('es-ES', { weekday: 'long' })} de Victoria
          </Badge>
          <h1 className="text-2xl lg:text-3xl font-semibold mb-3 text-white">
            Documenta tus éxitos semanales y construye tu narrativa de liderazgo
          </h1>
          <p className="text-white/90 max-w-2xl">
            Hola {user?.name?.split(' ')[0]}, cada logro que registras te acerca a tu próxima oportunidad.
          </p>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {quickImpactButtons.map((button) => {
          const Icon = button.icon;
          return (
            <button
              key={button.type}
              onClick={() => handleQuickImpact(button.type)}
              className={`flex flex-col items-center gap-3 p-6 rounded-[var(--card-radius)] transition-colors ${button.color}`}
            >
              <Icon className="h-8 w-8" />
              <span className="font-medium text-center">{button.label}</span>
            </button>
          );
        })}
      </div>

      <Card
        variant="outlined"
        className="border-dashed border-2 cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors"
      >
        <button onClick={() => setShowUploadModal(true)} className="w-full text-left">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-accent/20">
              <FileUp className="h-6 w-6 text-accent-foreground" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-1">Upload evidencia</h3>
              <p className="text-sm text-muted-foreground">
                Si alguien dijo "gracias por X", ese archivo pertenece aquí. Screenshots,
                testimonios, métricas—todo cuenta.
              </p>
            </div>
          </div>
        </button>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Logros Registrados</p>
              <p className="text-3xl font-semibold">{stats.totalAchievements}</p>
            </div>
            <div className="p-3 rounded-lg bg-primary/10">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Con Evidencias</p>
              <p className="text-3xl font-semibold">{evidencePercentage}%</p>
            </div>
            <div className="p-3 rounded-lg bg-[var(--success)]/10">
              <CheckCircle2 className="h-6 w-6 text-[var(--success)]" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Hitos Destacados</p>
              <p className="text-3xl font-semibold">{stats.milestones}</p>
            </div>
            <div className="p-3 rounded-lg bg-accent/20">
              <Award className="h-6 w-6 text-accent-foreground" />
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Logros Recientes</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => router.push('/bitacora')}>
              Ver todos
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {achievements.slice(0, 3).map((achievement) => (
              <div
                key={achievement.id}
                className="flex items-start gap-3 pb-4 border-b border-border last:border-0 last:pb-0"
              >
                <div className="flex-1">
                  <div className="flex items-start gap-2 mb-1">
                    <h4 className="font-medium flex-1">{achievement.title}</h4>
                    <Badge
                      variant={
                        achievement.type === 'conflict'
                          ? 'strategic'
                          : achievement.type === 'process'
                          ? 'process'
                          : 'support'
                      }
                    >
                      {achievement.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {achievement.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-muted-foreground">
                      {new Date(achievement.date).toLocaleDateString('es-ES')}
                    </span>
                    {achievement.status === 'curated' && (
                      <Badge variant="verified" className="text-xs">
                        Verificado por {achievement.curatedBy}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {showUploadModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setShowUploadModal(false)}
        >
          <Card className="max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <CardHeader>
              <CardTitle>Upload Evidencia</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <FileUp className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-4">
                  Arrastra archivos aquí o haz clic para seleccionar
                </p>
                <Button variant="secondary">Seleccionar archivos</Button>
              </div>
              <div className="mt-4 flex gap-2">
                <Button
                  variant="secondary"
                  className="flex-1"
                  onClick={() => setShowUploadModal(false)}
                >
                  Cancelar
                </Button>
                <Button className="flex-1" onClick={() => setShowUploadModal(false)}>
                  Subir
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
