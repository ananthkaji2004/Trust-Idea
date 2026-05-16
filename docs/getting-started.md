# Getting started

## Prerequisites

- Node.js 18+
- npm
- A [Supabase](https://supabase.com) project (for Google OAuth and email sign-in)

## Setup

1. Clone the repo and install dependencies:

   ```bash
   npm install
   ```

2. Copy environment variables:

   ```bash
   cp .env.example .env.local
   ```

3. Fill in [`.env.local`](../.env.local):

   - `NEXT_PUBLIC_SUPABASE_URL` — Project URL from Supabase → Settings → API
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` — `anon` public key from the same page

## Supabase Auth (required for OAuth)

### URL configuration

In Supabase Dashboard → **Authentication** → **URL configuration**:

| Setting | Development example |
|---------|---------------------|
| Site URL | `http://localhost:3007` |
| Redirect URLs | `http://localhost:3007/auth/callback` |

Add your production domain when you deploy (e.g. `https://yourapp.com/auth/callback`).

### Enable providers

Go to **Authentication** → **Providers** and enable each provider you need:

| Provider | Notes |
|----------|--------|
| **Google** | Create OAuth credentials in Google Cloud Console. Authorized redirect URI: `https://<project-ref>.supabase.co/auth/v1/callback` |
| **Email** | Enable for magic-link sign-in |

The app redirects users to each provider’s official login page; after success they return to `/auth/callback` and then to `/dashboard`.

## Fix: Google “Error 400: redirect_uri_mismatch”

This error means **Google Cloud** has the wrong redirect URI. With Supabase, Google must redirect to **Supabase**, not to your Next.js app directly.

### Step 1 — Google Cloud Console

1. Open [Google Cloud Console](https://console.cloud.google.com/) → **APIs & Services** → **Credentials**.
2. Open your **OAuth 2.0 Client ID** (Web application).
3. Under **Authorized redirect URIs**, add **exactly one** URI (copy from your Supabase project URL):

   ```text
   https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback
   ```

   Example: if `NEXT_PUBLIC_SUPABASE_URL` is `https://abcdefghij.supabase.co`, use:

   ```text
   https://abcdefghij.supabase.co/auth/v1/callback
   ```

4. **Remove** any entries like `http://localhost:3000/auth/callback` from Google — those belong in Supabase only, not in Google.
5. Under **Authorized JavaScript origins** (optional for local dev), you may add:
   - `http://localhost:3000`
   - `http://localhost:3005` (if you use another port)
   - `http://localhost:3007` (if that is your current dev port)
6. Save. Wait 1–2 minutes for Google to apply changes.

### Step 2 — Supabase Dashboard

1. **Authentication** → **Providers** → **Google**: enable and paste the **same** Client ID and Client Secret from Google Cloud.
2. **Authentication** → **URL configuration**:
   - **Site URL**: `http://localhost:3007` (or the port shown when you run `npm run dev`)
   - **Redirect URLs**: add your app callback, e.g. `http://localhost:3007/auth/callback` and any extra ports (`3000`, `3005`, etc.)

### Step 3 — Local port

If `npm run dev` says `using port 3007`, either:

- Add `http://localhost:3007/auth/callback` to Supabase **Redirect URLs**, and set in `.env.local`:

  ```env
  NEXT_PUBLIC_SITE_URL=http://localhost:3007
  ```

- Or stop other Node processes and run on port **3000** so it matches Supabase’s Site URL.

Then try **Google** sign-in again from the landing page.

### “Unable to exchange external code” (hash or `auth_error=google_config`)

Google accepted the redirect, but Supabase could not finish sign-in. This is almost always a **Client ID / Client Secret mismatch**, not a localhost redirect problem.

1. Open [Google Cloud Console](https://console.cloud.google.com/) → **APIs & Services** → **Credentials** → your **Web application** OAuth client.
2. Copy **Client ID** and **Client secret** again (create a new secret if unsure).
3. In Supabase → **Authentication** → **Providers** → **Google**, paste both values and save.
4. Confirm Google **Authorized redirect URIs** contains only:
   `https://YOUR_REF.supabase.co/auth/v1/callback` (not `localhost`).
5. Confirm Supabase **Redirect URLs** includes your dev URL, e.g. `http://localhost:3007/auth/callback`.

## Running the project

```bash
npm run dev
```

Open [http://localhost:3007](http://localhost:3007) for the landing page when Next.js is using port 3007. Use **Google** on the hero to sign in, or **Login** in the navbar for Google and email.

```bash
npm run build
```

Production build and type check.
