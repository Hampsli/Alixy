'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { useApp } from '@/context/AppContext';
import { RedirectIfAuthed } from '@/components/RouteGuard';
import { FolderOpen, FileText, Users } from 'lucide-react';

export default function LoginPage() {
  return (
    <RedirectIfAuthed>
      <Login />
    </RedirectIfAuthed>
  );
}

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { login, loading } = useApp();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await login(email, password);
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al iniciar sesión');
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-[var(--primary-hover)] opacity-90" />
        <div className="relative z-10 max-w-md text-white">
          <Badge variant="verified" className="mb-6 bg-white/20 text-white">
            ALIXY
          </Badge>
          <h1 className="text-4xl font-semibold mb-4 text-white">
            Tu narrativa de liderazgo comienza aquí
          </h1>
          <p className="text-lg text-white/90 mb-8">
            Documenta tu impacto, negocia con evidencia, conecta con mentoras verificadas.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-white/10">
                <FolderOpen className="h-5 w-5" />
              </div>
              <span>Carpeta de evidencias organizada</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-white/10">
                <FileText className="h-5 w-5" />
              </div>
              <span>Reportes ejecutivos trimestrales</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-white/10">
                <Users className="h-5 w-5" />
              </div>
              <span>Red de curadoras y mentoras</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 bg-background">
        <Card className="w-full max-w-md">
          <div className="mb-8">
            <Badge variant="verified" className="mb-4 lg:hidden">ALIXY</Badge>
            <h2 className="text-2xl font-semibold mb-2">Bienvenida de vuelta</h2>
            <p className="text-muted-foreground">Ingresa tus credenciales para continuar</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Correo electrónico"
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              label="Contraseña"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-border" />
                <span className="text-muted-foreground">Recordarme</span>
              </label>
              <a href="#" className="text-primary hover:underline">
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading ? 'Iniciando…' : 'Iniciar sesión'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              ¿Aún no tienes cuenta?{' '}
              <Link href="/signup" className="text-primary font-medium hover:underline">
                Solicita acceso
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
