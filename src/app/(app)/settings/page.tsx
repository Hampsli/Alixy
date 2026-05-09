'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/Card';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Avatar } from '@/components/Avatar';
import { Badge } from '@/components/Badge';
import { useApp } from '@/context/AppContext';
import { User, Lock, Shield, Bell, HelpCircle } from 'lucide-react';
import * as Tabs from '@radix-ui/react-tabs';
import * as Switch from '@radix-ui/react-switch';

export default function SettingsPage() {
  const { user } = useApp();
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-semibold mb-2">Configuración</h1>
        <p className="text-muted-foreground">Administra tu cuenta y preferencias</p>
      </div>

      <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
        <Tabs.List className="flex gap-2 border-b border-border mb-6 overflow-x-auto">
          <Tabs.Trigger
            value="profile"
            className="px-4 py-2 font-medium text-muted-foreground data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary -mb-px whitespace-nowrap flex items-center gap-2"
          >
            <User className="h-4 w-4" />
            Perfil
          </Tabs.Trigger>
          <Tabs.Trigger
            value="security"
            className="px-4 py-2 font-medium text-muted-foreground data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary -mb-px whitespace-nowrap flex items-center gap-2"
          >
            <Lock className="h-4 w-4" />
            Seguridad
          </Tabs.Trigger>
          <Tabs.Trigger
            value="privacy"
            className="px-4 py-2 font-medium text-muted-foreground data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary -mb-px whitespace-nowrap flex items-center gap-2"
          >
            <Shield className="h-4 w-4" />
            Privacidad
          </Tabs.Trigger>
          <Tabs.Trigger
            value="notifications"
            className="px-4 py-2 font-medium text-muted-foreground data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary -mb-px whitespace-nowrap flex items-center gap-2"
          >
            <Bell className="h-4 w-4" />
            Notificaciones
          </Tabs.Trigger>
          <Tabs.Trigger
            value="support"
            className="px-4 py-2 font-medium text-muted-foreground data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary -mb-px whitespace-nowrap flex items-center gap-2"
          >
            <HelpCircle className="h-4 w-4" />
            Soporte
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Información Profesional</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 mb-6">
                <Avatar
                  src={user?.avatar}
                  fallback={user?.name?.split(' ').map((n) => n[0]).join('') || 'U'}
                  size="lg"
                />
                <div>
                  <Button variant="secondary" size="sm">Cambiar foto</Button>
                  <p className="text-xs text-muted-foreground mt-1">JPG, PNG. Máx 2MB</p>
                </div>
              </div>

              <Input label="Nombre completo" defaultValue={user?.name} />
              <Input label="Correo electrónico" type="email" defaultValue={user?.email} />
              <Input label="Rol actual" defaultValue={user?.role} />

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium">Bio profesional</label>
                <textarea
                  className="flex min-h-24 w-full rounded-lg border border-border bg-background px-4 py-2 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
                  placeholder="Cuéntanos sobre ti..."
                  defaultValue="Senior Software Engineer con 7 años de experiencia en desarrollo web full-stack. Apasionada por la arquitectura de sistemas y el liderazgo técnico."
                />
              </div>

              <div className="pt-4">
                <Button>Guardar cambios</Button>
              </div>
            </CardContent>
          </Card>
        </Tabs.Content>

        <Tabs.Content value="security">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Cambiar Contraseña</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input label="Contraseña actual" type="password" />
                <Input label="Nueva contraseña" type="password" />
                <Input label="Confirmar nueva contraseña" type="password" />
                <Button>Actualizar contraseña</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sesiones Activas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium">MacBook Pro — México</p>
                    <p className="text-sm text-muted-foreground">Última actividad: Ahora</p>
                  </div>
                  <Badge variant="support">Actual</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div>
                    <p className="font-medium">iPhone — México</p>
                    <p className="text-sm text-muted-foreground">
                      Última actividad: Hace 2 horas
                    </p>
                  </div>
                  <Button variant="destructive" size="sm">Cerrar</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </Tabs.Content>

        <Tabs.Content value="privacy">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de Privacidad</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <SettingSwitch
                title="Compartir datos con investigadores"
                description="Ayuda a mejorar ALIXY con datos anonimizados"
                defaultChecked
              />
              <SettingSwitch
                title="Insights de la comunidad"
                description="Recibe tendencias y benchmarks anónimos"
                defaultChecked
              />
              <SettingSwitch
                title="Recomendaciones personalizadas"
                description="Sugerencias de curadoras y mentoras basadas en tu perfil"
                defaultChecked
              />
            </CardContent>
          </Card>
        </Tabs.Content>

        <Tabs.Content value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Preferencias de Notificaciones</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <SettingSwitch
                title="Recordatorios semanales"
                description="Viernes de Victoria — registra tus logros"
                defaultChecked
              />
              <SettingSwitch
                title="Curaduría completada"
                description="Cuando una curadora revisa tus logros"
                defaultChecked
              />
              <SettingSwitch
                title="Nuevas mentoras disponibles"
                description="Notificación cuando hay nuevas mentoras en tu área"
              />
              <SettingSwitch
                title="Actualizaciones del producto"
                description="Nuevas funcionalidades y mejoras de ALIXY"
                defaultChecked
              />
            </CardContent>
          </Card>
        </Tabs.Content>

        <Tabs.Content value="support">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recursos de Ayuda</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="secondary" className="w-full justify-start">
                  📖 Guía de inicio rápido
                </Button>
                <Button variant="secondary" className="w-full justify-start">
                  ❓ Preguntas frecuentes (FAQ)
                </Button>
                <Button variant="secondary" className="w-full justify-start">
                  🎥 Video tutoriales
                </Button>
                <Button variant="secondary" className="w-full justify-start">
                  💬 Contactar soporte
                </Button>
              </CardContent>
            </Card>

            <Card variant="flat">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">¿Tienes feedback?</p>
                <p className="mb-4">Nos encantaría escucharte para mejorar ALIXY</p>
                <Button>Enviar feedback</Button>
              </div>
            </Card>
          </div>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}

function SettingSwitch({
  title,
  description,
  defaultChecked,
}: {
  title: string;
  description: string;
  defaultChecked?: boolean;
}) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
      <div className="flex-1">
        <p className="font-medium mb-1">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Switch.Root
        className="w-11 h-6 bg-muted rounded-full data-[state=checked]:bg-primary transition-colors"
        defaultChecked={defaultChecked}
      >
        <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform translate-x-0.5 data-[state=checked]:translate-x-5" />
      </Switch.Root>
    </div>
  );
}
