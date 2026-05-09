'use client';

import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle } from '@/components/Card';
import { Button } from '@/components/Button';
import { Badge } from '@/components/Badge';
import { api } from '@/lib/api';
import { FileText, Image as ImageIcon, File, Star, Link as LinkIcon } from 'lucide-react';

interface Evidence {
  id: string;
  name: string;
  type: 'pdf' | 'image' | 'other';
  date: string;
  linked: boolean;
  featured: boolean;
}

export default function CarpetaPage() {
  const [evidences, setEvidences] = useState<Evidence[]>([]);

  useEffect(() => {
    api<Evidence[]>('/evidences')
      .then(setEvidences)
      .catch(console.error);
  }, []);

  const getIcon = (type: string) => {
    if (type === 'image') return ImageIcon;
    if (type === 'pdf') return FileText;
    return File;
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold mb-2">Carpeta de Evidencias</h1>
          <p className="text-muted-foreground">
            Organiza y marca tus evidencias más importantes
          </p>
        </div>
        <Button size="lg">Subir archivo</Button>
      </div>

      <Card variant="flat">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-accent/30">
            <Star className="h-5 w-5 text-accent-foreground" />
          </div>
          <div className="flex-1">
            <p className="font-medium mb-1">Tip: Marca evidencias como "Destacado"</p>
            <p className="text-sm text-muted-foreground">
              Las evidencias destacadas aparecerán primero en tu Dossier Trimestral
            </p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <p className="text-sm text-muted-foreground mb-1">Total archivos</p>
          <p className="text-2xl font-semibold">{evidences.length}</p>
        </Card>
        <Card>
          <p className="text-sm text-muted-foreground mb-1">Vinculados a logros</p>
          <p className="text-2xl font-semibold">
            {evidences.filter((e) => e.linked).length}
          </p>
        </Card>
        <Card>
          <p className="text-sm text-muted-foreground mb-1">Destacados</p>
          <p className="text-2xl font-semibold">
            {evidences.filter((e) => e.featured).length}
          </p>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {evidences.map((evidence) => {
          const Icon = getIcon(evidence.type);
          return (
            <Card key={evidence.id} className="relative group hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-muted">
                  <Icon className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium truncate mb-1">{evidence.name}</h4>
                  <p className="text-xs text-muted-foreground">
                    {new Date(evidence.date).toLocaleDateString('es-ES')}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    {evidence.linked ? (
                      <Badge variant="support" className="text-xs">
                        <LinkIcon className="h-3 w-3 mr-1" />
                        Vinculado
                      </Badge>
                    ) : (
                      <Badge variant="default" className="text-xs">
                        Sin vincular
                      </Badge>
                    )}
                    {evidence.featured && (
                      <Star className="h-4 w-4 fill-accent text-accent" />
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-border flex gap-2">
                <Button variant="ghost" size="sm" className="flex-1 text-xs">
                  Ver
                </Button>
                <Button variant="ghost" size="sm" className="flex-1 text-xs">
                  {evidence.featured ? 'Quitar destaque' : 'Destacar'}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      <Card variant="outlined" className="border-dashed border-2">
        <div className="text-center py-8">
          <File className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <CardHeader className="items-center">
            <CardTitle>Arrastra archivos aquí</CardTitle>
          </CardHeader>
          <p className="text-sm text-muted-foreground mb-4">
            O haz clic para seleccionar desde tu dispositivo
          </p>
          <Button variant="secondary">Seleccionar archivos</Button>
        </div>
      </Card>
    </div>
  );
}
