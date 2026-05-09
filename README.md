# Alixy

Plataforma para que mujeres en tech documenten su impacto, organicen evidencias y conecten con curadoras y mentoras.

Stack: **Next.js 16** (App Router, React 19, Tailwind 4) + **Express** (backend mock en memoria). Todo orquestado con `docker compose`.

## Estructura

```
.
├── src/                    # Frontend Next.js
│   ├── app/
│   │   ├── (app)/          # Route group protegido (RequireAuth + Layout)
│   │   │   ├── dashboard/
│   │   │   ├── bitacora/
│   │   │   ├── carpeta/
│   │   │   ├── dossier/
│   │   │   ├── red/
│   │   │   └── settings/
│   │   ├── login/
│   │   ├── signup/
│   │   ├── globals.css     # Theme tokens + fuentes
│   │   ├── layout.tsx
│   │   ├── page.tsx        # Redirect a /login o /dashboard
│   │   └── providers.tsx   # AppProvider (client)
│   ├── components/         # Avatar, Badge, Button, Card, Input, Layout, RouteGuard
│   ├── context/            # AppContext (auth + achievements)
│   └── lib/                # api.ts (fetch helper), utils.ts (cn)
├── alixy-backend/          # Express server (puerto 4000)
│   └── src/
│       ├── server.js
│       └── data.js         # Seed: achievements, evidencias, organizaciones, curadoras, mentoras
├── Dockerfile              # Frontend (next dev en el contenedor)
├── alixy-backend/Dockerfile
└── docker-compose.yml
```

## Levantar la app

### Con Docker (recomendado)

```bash
docker compose up -d --build
```

- Frontend: http://localhost:3001
- Backend:  http://localhost:4000

> El frontend se mapea a `3001` porque `:3000` suele estar tomado en máquinas con SSH tunnels. Si querés `:3000`, cambiá la línea `"3001:3000"` en [docker-compose.yml](docker-compose.yml).

Apagar:

```bash
docker compose down
```

### Local sin Docker

En dos terminales:

```bash
# Terminal 1 — backend
cd alixy-backend
npm install
npm start          # http://localhost:4000

# Terminal 2 — frontend
npm install
NEXT_PUBLIC_API_URL=http://localhost:4000 npm run dev   # http://localhost:3000
```

## Login

El backend no valida credenciales (es un mock). **Cualquier email + contraseña** entran y devuelven la usuaria de demo *Liliana Torres*.

## Pantallas

| Ruta          | Pantalla                                              |
| ------------- | ----------------------------------------------------- |
| `/login`      | Inicio de sesión                                      |
| `/signup`     | Solicitud de acceso                                   |
| `/dashboard`  | Hero, accesos rápidos, stats, logros recientes        |
| `/bitacora`   | Listado y alta de logros (con filtro por tipo)        |
| `/carpeta`    | Evidencias subidas (vinculadas / destacadas)          |
| `/dossier`    | Reporte trimestral con testimonios y próximos pasos   |
| `/red`        | Organizaciones aliadas, curadoras y mentoras (tabs)   |
| `/settings`   | Perfil, seguridad, privacidad, notificaciones, soporte|

Las rutas bajo `(app)` están protegidas en cliente por [`RequireAuth`](src/components/RouteGuard.tsx); las de auth usan `RedirectIfAuthed`. La sesión se persiste en `localStorage` (`alixy.user`).

## API del backend

Base: `http://localhost:4000`

| Método | Endpoint                    | Descripción                                  |
| ------ | --------------------------- | -------------------------------------------- |
| GET    | `/health`                   | Healthcheck (`{ ok: true }`)                 |
| POST   | `/auth/login`               | Login mock — recibe `{email, password}`      |
| POST   | `/auth/signup`              | Registra solicitud (no crea usuario real)    |
| GET    | `/achievements`             | Lista de logros                              |
| POST   | `/achievements`             | Crea un logro                                |
| PATCH  | `/achievements/:id`         | Actualiza logro                              |
| GET    | `/evidences`                | Evidencias seed                              |
| GET    | `/network/organizations`    | Organizaciones aliadas                       |
| GET    | `/network/curators`         | Curadoras certificadas                       |
| GET    | `/network/mentors`          | Mentoras disponibles                         |

Los datos viven en memoria — se reinician al reiniciar el contenedor.

## Variables de entorno

Frontend:

| Variable               | Default                  | Notas                              |
| ---------------------- | ------------------------ | ---------------------------------- |
| `NEXT_PUBLIC_API_URL`  | `http://localhost:4000`  | Base del backend desde el browser  |

Backend:

| Variable | Default | Notas              |
| -------- | ------- | ------------------ |
| `PORT`   | `4000`  | Puerto del server  |

## Theme & UI

- Tokens en [src/app/globals.css](src/app/globals.css): colores ALIXY (`--primary` violeta, `--accent` dorado, etc.), `--card-radius`, `--button-radius`, `--badge-radius`.
- Tipografía: Lora (headings), Plus Jakarta Sans (body), JetBrains Mono (code) — desde Google Fonts.
- Componentes propios sobre Radix UI primitives (`@radix-ui/react-{avatar,slot,tabs,switch}`) + iconos `lucide-react` + `tw-animate-css`.

## Notas para agentes

- Próximamente: ver [AGENTS.md](AGENTS.md). Esta es **Next.js 16** — leer `node_modules/next/dist/docs/` antes de tocar APIs (App Router, `next/navigation`, etc.).
- No hay `react-router`, no hay `useNavigate`, no hay Vite. Migración hecha en este repo desde una versión Vite previa.
- Si Docker falla con `npm error E401` en el build, es por el registry privado heredado del `~/.npmrc` global. Los lockfiles de este repo se regeneraron contra `https://registry.npmjs.org/` y hay un `.npmrc` por proyecto que lo fija — no commitees lockfiles regenerados con el registry privado.
