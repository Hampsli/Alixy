'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Badge } from '@/components/Badge';
import { Avatar } from '@/components/Avatar';
import * as Tabs from '@radix-ui/react-tabs';
import { Star, Calendar } from 'lucide-react';
import { api } from '@/lib/api';

interface Organization {
  id: string;
  name: string;
  description: string;
  tags: string[];
  logo: string;
}
interface Curator {
  id: string;
  name: string;
  specialty: string;
  rate: string;
  rating: number;
  reviews: number;
  avatar: string;
}
interface Mentor {
  id: string;
  name: string;
  specialty: string;
  rate: string;
  availability: string;
  avatar: string;
}

export default function RedPage() {
  const [activeTab, setActiveTab] = useState('organizations');
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [curators, setCurators] = useState<Curator[]>([]);
  const [mentors, setMentors] = useState<Mentor[]>([]);

  useEffect(() => {
    api<Organization[]>('/network/organizations').then(setOrganizations).catch(console.error);
    api<Curator[]>('/network/curators').then(setCurators).catch(console.error);
    api<Mentor[]>('/network/mentors').then(setMentors).catch(console.error);
  }, []);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-semibold mb-2">Red de Apoyo</h1>
        <p className="text-muted-foreground">
          Conecta con organizaciones, curadoras certificadas y mentoras
        </p>
      </div>

      <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
        <Tabs.List className="flex gap-2 border-b border-border mb-6">
          <Tabs.Trigger
            value="organizations"
            className="px-4 py-2 font-medium text-muted-foreground data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary -mb-px"
          >
            Organizaciones Aliadas
          </Tabs.Trigger>
          <Tabs.Trigger
            value="curators"
            className="px-4 py-2 font-medium text-muted-foreground data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary -mb-px"
          >
            Curadoras Certificadas
          </Tabs.Trigger>
          <Tabs.Trigger
            value="mentors"
            className="px-4 py-2 font-medium text-muted-foreground data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary -mb-px"
          >
            Mentoras Disponibles
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="organizations">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {organizations.map((org) => (
              <Card key={org.id}>
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{org.logo}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{org.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{org.description}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {org.tags.map((tag) => (
                        <Badge key={tag} variant="default">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Button variant="secondary" size="sm" className="w-full">
                      Conocer más
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Tabs.Content>

        <Tabs.Content value="curators">
          <div className="space-y-4">
            {curators.map((curator) => (
              <Card key={curator.id}>
                <div className="flex items-start gap-4">
                  <Avatar
                    src={curator.avatar}
                    fallback={curator.name.split(' ').map((n) => n[0]).join('')}
                    size="lg"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold mb-1">{curator.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {curator.specialty}
                        </p>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-accent text-accent" />
                            <span className="text-sm font-medium">{curator.rating}</span>
                            <span className="text-xs text-muted-foreground">
                              ({curator.reviews} reseñas)
                            </span>
                          </div>
                        </div>
                      </div>
                      <Badge variant="verified">{curator.rate}</Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="secondary" size="sm" className="flex-1">
                        Ver perfil
                      </Button>
                      <Button size="sm" className="flex-1">
                        Solicitar curaduría
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Tabs.Content>

        <Tabs.Content value="mentors">
          <div className="space-y-4">
            {mentors.map((mentor) => (
              <Card key={mentor.id}>
                <div className="flex items-start gap-4">
                  <Avatar
                    src={mentor.avatar}
                    fallback={mentor.name.split(' ').map((n) => n[0]).join('')}
                    size="lg"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold mb-1">{mentor.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {mentor.specialty}
                        </p>
                        <div className="flex items-center gap-3">
                          <Badge
                            variant={mentor.rate.includes('Gratis') ? 'support' : 'verified'}
                          >
                            {mentor.rate}
                          </Badge>
                          <div className="flex items-center gap-1 text-sm">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span
                              className={
                                mentor.availability === 'Disponible'
                                  ? 'text-[var(--success)]'
                                  : 'text-muted-foreground'
                              }
                            >
                              {mentor.availability}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="secondary" size="sm" className="flex-1">
                        Ver perfil
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1"
                        disabled={mentor.availability !== 'Disponible'}
                      >
                        {mentor.availability === 'Disponible'
                          ? 'Solicitar sesión'
                          : 'Unirse a lista'}
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Card variant="flat" className="mt-6">
            <div className="text-center">
              <h3 className="font-semibold mb-2">¿Quieres ser mentora?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Comparte tu experiencia y ayuda a otras mujeres en tech a crecer profesionalmente
              </p>
              <Button variant="secondary">Postular como mentora</Button>
            </div>
          </Card>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}
