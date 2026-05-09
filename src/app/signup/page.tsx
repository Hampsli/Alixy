'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { RedirectIfAuthed } from '@/components/RouteGuard';
import { api } from '@/lib/api';
import { CheckCircle2 } from 'lucide-react';

export default function SignupPage() {
  return (
    <RedirectIfAuthed>
      <Signup />
    </RedirectIfAuthed>
  );
}

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
    interest: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await api('/auth/signup', {
        method: 'POST',
        body: JSON.stringify(formData),
      });
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al enviar solicitud');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-background">
        <Card className="w-full max-w-md text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-[var(--success)]/10">
              <CheckCircle2 className="h-12 w-12 text-[var(--success)]" />
            </div>
          </div>
          <h2 className="text-2xl font-semibold mb-3">¡Solicitud enviada!</h2>
          <p className="text-muted-foreground mb-6">
            Revisaremos tu solicitud pronto. Te notificaremos por correo cuando tu cuenta esté lista.
          </p>
          <Link href="/login">
            <Button variant="secondary" className="w-full">
              Volver al inicio de sesión
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <Card className="w-full max-w-md">
        <div className="mb-6">
          <Badge variant="verified" className="mb-4">ALIXY</Badge>
          <h2 className="text-2xl font-semibold mb-2">Solicita acceso</h2>
          <p className="text-muted-foreground">
            Únete a la red de mujeres en tech que documentan su impacto
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Nombre completo"
            type="text"
            placeholder="María González"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <Input
            label="Correo electrónico"
            type="email"
            placeholder="maria@empresa.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <Input
            label="Contraseña"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">Rol actual</label>
            <select
              className="flex h-11 w-full rounded-lg border border-border bg-background px-4 py-2 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              required
            >
              <option value="">Selecciona tu rol</option>
              <option value="software-engineer">Software Engineer</option>
              <option value="senior-engineer">Senior Engineer</option>
              <option value="tech-lead">Tech Lead</option>
              <option value="engineering-manager">Engineering Manager</option>
              <option value="product-manager">Product Manager</option>
              <option value="designer">Designer</option>
              <option value="data-scientist">Data Scientist</option>
              <option value="other">Otro</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">¿Por qué te interesa ALIXY?</label>
            <textarea
              className="flex min-h-24 w-full rounded-lg border border-border bg-background px-4 py-2 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
              placeholder="Cuéntanos brevemente qué esperas lograr con ALIXY..."
              value={formData.interest}
              onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
              required
            />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <Button type="submit" className="w-full" size="lg" disabled={submitting}>
            {submitting ? 'Enviando…' : 'Enviar solicitud'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            ¿Ya tienes cuenta?{' '}
            <Link href="/login" className="text-primary font-medium hover:underline">
              Inicia sesión
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}
