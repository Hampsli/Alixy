'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/Card';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Badge } from '@/components/Badge';
import { useApp } from '@/context/AppContext';
import { Plus, FileText, Calendar, Filter, X } from 'lucide-react';

type AchievementType = 'conflict' | 'process' | 'support' | 'strategic' | 'other';

const typeLabels: Record<AchievementType, string> = {
  conflict: 'Conflicto',
  process: 'Proceso',
  support: 'Apoyo',
  strategic: 'Estratégico',
  other: 'Otro',
};

export default function BitacoraPage() {
  return (
    <Suspense fallback={null}>
      <Bitacora />
    </Suspense>
  );
}

function Bitacora() {
  const { achievements, addAchievement } = useApp();
  const searchParams = useSearchParams();
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState<string>('all');
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'strategic' as AchievementType,
    date: new Date().toISOString().split('T')[0],
    notes: '',
  });

  useEffect(() => {
    const newType = searchParams.get('new');
    if (newType) {
      setFormData((f) => ({ ...f, type: newType as AchievementType }));
      setShowModal(true);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await addAchievement({
        ...formData,
        status: 'raw',
        evidences: [],
      });
      setShowModal(false);
      setFormData({
        title: '',
        description: '',
        type: 'strategic',
        date: new Date().toISOString().split('T')[0],
        notes: '',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const filteredAchievements =
    filter === 'all' ? achievements : achievements.filter((a) => a.type === filter);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold mb-2">Bitácora de Logros</h1>
          <p className="text-muted-foreground">Documenta cada victoria, grande o pequeña</p>
        </div>
        <Button onClick={() => setShowModal(true)} size="lg">
          <Plus className="h-5 w-5" />
          Nuevo logro
        </Button>
      </div>

      <Card>
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="h-5 w-5 text-muted-foreground" />
          <Button
            variant={filter === 'all' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            Todos ({achievements.length})
          </Button>
          <Button
            variant={filter === 'conflict' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setFilter('conflict')}
          >
            Conflictos ({achievements.filter((a) => a.type === 'conflict').length})
          </Button>
          <Button
            variant={filter === 'process' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setFilter('process')}
          >
            Procesos ({achievements.filter((a) => a.type === 'process').length})
          </Button>
          <Button
            variant={filter === 'support' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setFilter('support')}
          >
            Apoyo ({achievements.filter((a) => a.type === 'support').length})
          </Button>
        </div>
      </Card>

      <div className="space-y-4">
        {filteredAchievements.map((achievement) => (
          <Card key={achievement.id}>
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <div className="flex items-start gap-3 mb-2">
                  <h3 className="font-semibold flex-1">{achievement.title}</h3>
                  <Badge
                    variant={
                      achievement.type === 'strategic'
                        ? 'strategic'
                        : achievement.type === 'process'
                        ? 'process'
                        : achievement.type === 'support'
                        ? 'support'
                        : 'default'
                    }
                  >
                    {typeLabels[achievement.type]}
                  </Badge>
                </div>
                <p className="text-muted-foreground mb-3">{achievement.description}</p>
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {new Date(achievement.date).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <FileText className="h-4 w-4" />
                    {achievement.evidences.length} evidencia(s)
                  </div>
                  {achievement.status === 'curated' ? (
                    <Badge variant="verified">Curado por {achievement.curatedBy}</Badge>
                  ) : (
                    <Badge variant="default">Sin curar</Badge>
                  )}
                </div>
              </div>
              <Button variant="secondary" size="sm">
                Ver detalles
              </Button>
            </div>
          </Card>
        ))}

        {filteredAchievements.length === 0 && (
          <Card className="text-center py-12">
            <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="font-semibold mb-2">No hay logros registrados</h3>
            <p className="text-muted-foreground mb-4">Comienza a documentar tu impacto</p>
            <Button onClick={() => setShowModal(true)}>
              <Plus className="h-5 w-5" />
              Registrar primer logro
            </Button>
          </Card>
        )}
      </div>

      {showModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto"
          onClick={() => setShowModal(false)}
        >
          <Card className="max-w-2xl w-full my-8" onClick={(e) => e.stopPropagation()}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Registrar Logro</CardTitle>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-1 hover:bg-muted rounded"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="¿Qué lograste?"
                  placeholder="Ej: Resolví conflicto entre equipos de backend y frontend"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium">Describe el impacto</label>
                  <textarea
                    className="flex min-h-24 w-full rounded-lg border border-border bg-background px-4 py-2 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
                    placeholder="Ej: Medié una sesión de alineación que resultó en una API redesignada con mejor performance y DX."
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium">Tipo de impacto</label>
                  <select
                    className="flex h-11 w-full rounded-lg border border-border bg-background px-4 py-2 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value as AchievementType })
                    }
                    required
                  >
                    <option value="strategic">Estratégico</option>
                    <option value="conflict">Resolución de Conflicto</option>
                    <option value="process">Optimización de Proceso</option>
                    <option value="support">Apoyo a Compañera</option>
                    <option value="other">Otro</option>
                  </select>
                </div>

                <Input
                  label="Fecha"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                />

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium">Notas privadas (opcional)</label>
                  <textarea
                    className="flex min-h-20 w-full rounded-lg border border-border bg-background px-4 py-2 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
                    placeholder="Contexto adicional, reflexiones, o detalles que quieras recordar..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="secondary"
                    className="flex-1"
                    onClick={() => setShowModal(false)}
                  >
                    Cancelar
                  </Button>
                  <Button type="submit" className="flex-1" disabled={submitting}>
                    {submitting ? 'Guardando…' : 'Guardar logro'}
                  </Button>
                </div>

                <p className="text-sm text-muted-foreground text-center">
                  Podrás adjuntar evidencias y solicitar curaduría después
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
