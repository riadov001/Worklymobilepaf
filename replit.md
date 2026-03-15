# Workly - Application Mobile

## Overview
Application mobile Expo React Native **plate-forme modulaire pour la gestion d'entreprise** Workly. L'app permet la gestion complète des devis, factures, planning, clients, stock, RH, inventaire et comptabilité via un système de modules personnalisables. Les comptes utilisateur sont créés par le service client.

## Architecture
- **Frontend**: Expo React Native (Expo Router, file-based routing)
- **Backend**: API externe hébergée sur `apps.mytoolsgroup.eu`, serveur Express proxy local
- **Auth**: Dual auth — Bearer token (admin `/api/mobile/*`) + cookie sessions (client)
- **State**: React Query pour les données serveur, React Context pour l'auth et les modules
- **Modules**: Context API avec API sync + AsyncStorage fallback (`lib/modules-context.tsx`)

## Design
- **Modern Business App**: iOS Settings-style grouped lists, Inter font family, blue/indigo palette
- **Primary color**: `#4F46E5` (light) / `#6366F1` (dark)
- **Logo**: `assets/images/workly_logo.png` (calendar + checkmark, blue-green gradient)
- **Tagline**: "Votre espace de travail"
- **First launch**: GDPR consent screen (`app/consent.tsx`) shown once, saved in AsyncStorage `consent_given`

## Modules System
Workly uses a modular architecture where users can enable/disable and customize business modules:

### Architecture
- **API-driven**: Modules are fetched from `GET /api/mobile/admin/modules` on startup
- **Fallback**: Local defaults used when API is unavailable (AsyncStorage cache)
- **Sync**: Preferences saved to `PUT /api/mobile/admin/modules/preferences` + AsyncStorage
- **Customizable**: Users can rename modules and edit descriptions via `PATCH /api/mobile/admin/modules/:id`
- **Backend storage**: `module_preferences` DB table (user_id, enabled_modules, custom_config)

### Default Modules
- **Core (enabled by default)**: Facturation, Devis, Clients, Planning
- **Optional (disabled by default)**: Stock, RH, Inventaire, Comptabilité

### Dynamic Navigation
- Tab bar adapts to enabled modules using `href: null` pattern (Expo Router)
- Dashboard shows horizontal scroll of enabled module chips
- Module hub (`modules.tsx`) provides grid with toggle switches and edit buttons

### Key Files
- `lib/modules-context.tsx` — React Context with API sync + AsyncStorage persistence
- `lib/admin-api.ts` — `adminModules` API calls (getAll, savePreferences, updateModule)
- `app/(admin)/(tabs)/modules.tsx` — Module management screen with customization modal
- `app/(admin)/(tabs)/_layout.tsx` — Dynamic tab visibility based on enabled modules
- `server/routes.ts` — Backend API routes for modules CRUD + preferences

## API Backend
Base URL: Configurable via `EXTERNAL_API_URL` env var (default: `https://apps.mytoolsgroup.eu/api`)

### Module API Endpoints
- `GET /api/mobile/admin/modules` — Returns available modules with user preferences
- `PUT /api/mobile/admin/modules/preferences` — Save enabled/disabled state + custom config
- `PATCH /api/mobile/admin/modules/:moduleId` — Update individual module config (name, description, etc.)

### Admin API Endpoints (Bearer token auth)
- `POST /api/mobile/auth/login` — Admin login → `{ accessToken, refreshToken, user }`
- `POST /api/mobile/auth/refresh` — Refresh token
- `GET /api/mobile/auth/me` — Current user profile
- `GET /api/mobile/admin/analytics` — Dashboard KPIs + revenue chart
- `GET/POST/PATCH/DELETE /api/mobile/admin/quotes` — Quotes CRUD
- `PATCH /api/mobile/admin/quotes/:id/status` — Quote status change
- `GET/POST/PATCH/DELETE /api/mobile/admin/invoices` — Invoices CRUD
- `GET/POST/PATCH/DELETE /api/mobile/admin/reservations` — Reservations CRUD
- `PATCH /api/mobile/admin/reservations/:id/status` — Reservation status change
- `GET/POST/PATCH/DELETE /api/mobile/admin/clients` — Clients CRUD
- `GET /api/admin/logs` — Server logs (circular buffer, 200 entries, optional `?since=` filter)

### Client API Endpoints (cookie auth)
- `POST /api/login` — Client login (email, password) → retourne user + cookie session
- `POST /api/logout` — Déconnexion
- `GET /api/auth/user` — Profil utilisateur authentifié
- `GET /api/services` — Liste des services
- `GET /api/quotes` — Liste des devis
- `POST /api/quotes` — Créer une demande de devis
- `POST /api/support/contact` — Formulaire de contact
- `DELETE /api/users/me` — Suppression permanente du compte

### Roles utilisateur
- `root_admin` / `root` — Root admin (all admin features + server logs)
- `admin` — Full access (admin interface, all CRUD + delete)
- `employe` — Admin interface, no delete permissions
- `client` — Particulier (client interface)
- `client_professionnel` — Professionnel (client interface)

## Structure du projet
```
app/
  _layout.tsx           # Root layout (providers, fonts)
  index.tsx             # Redirect basé sur auth
  (auth)/               # Flux d'authentification
    login.tsx           # Login admin
    register.tsx        # Page légale/confidentialité
    forgot-password.tsx
  (main)/               # App client (authentifié)
    (tabs)/
      _layout.tsx       # Tab navigation client
      index.tsx         # Accueil + services
      quotes.tsx, invoices.tsx, reservations.tsx, messages.tsx
      notifications.tsx, profile.tsx, more.tsx
  (admin)/              # Interface admin (admin/employe)
    _layout.tsx         # Stack admin
    (tabs)/
      _layout.tsx       # Tab navigation dynamique (modules)
      index.tsx         # Dashboard KPIs + modules
      quotes.tsx        # Devis CRUD
      invoices.tsx      # Factures CRUD
      reservations.tsx  # RDV CRUD
      clients.tsx       # Clients CRUD
      modules.tsx       # Module hub + personnalisation
      settings.tsx      # Paramètres
      stock.tsx         # Module Stock (coming soon)
      rh.tsx            # Module RH (coming soon)
      inventaire.tsx    # Module Inventaire (coming soon)
      comptabilite.tsx  # Module Comptabilité (coming soon)
    guide.tsx, logs.tsx, notifications.tsx
lib/
  modules-context.tsx   # Module system (API sync + local cache)
  admin-api.ts          # Admin API (Bearer token, CRUD, modules)
  api.ts                # Client API (cookie auth)
  auth-context.tsx      # Dual auth context
  query-client.ts       # React Query config
constants/
  theme.ts              # Light/Dark themes (indigo palette)
server/
  routes.ts             # Express routes + module API + proxy
  index.ts              # Express server (port 5000)
```

## User Preferences
- Language: Français
- Interface entièrement en français
- Font: Inter (Google Fonts) — Inter_700Bold for titles
- Contact: contact@workly.app

## Key Technical Notes
- No AI functionality in mobile app (Apple 5.1.1(v) compliance)
- Role-based routing: admin/employe → `(admin)`, client → `(main)`
- Admin auth: Bearer token stored in SecureStore (`access_token`, `refresh_token`)
- Client auth: Cookie-based sessions stored in SecureStore (`session_cookie`)
- Account deletion available via Profile → Paramètres → Supprimer mon compte
- Biometric auth auto-clears expired session credentials
- Data auto-refreshes: quotes every 30s, invoices/reservations every 60s, notifications every 30s

## App Review Mode
- **Environment variable**: `APP_REVIEW_MODE=true` enables the reviewer demo account bypass
- **Demo credentials**: `review@testapp.com` / `Test123456` (admin role)
- All admin CRUD endpoints return synthetic data when using the reviewer token
- Disable by removing or setting `APP_REVIEW_MODE=false` in production after review

## Network Resilience
- `lib/api.ts` and `lib/admin-api.ts` use 15s `AbortController` timeout + 1 retry on network errors
- User-friendly French error messages on timeout/unavailability
