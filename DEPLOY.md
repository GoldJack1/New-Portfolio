# Deploy (Netlify)

For the **GBR project PDF** to load on the live site, set these environment variables in Netlify.

## Steps

1. In **Netlify**: your site → **Site configuration** → **Environment variables** → **Add a variable** (or **Add from .env**).
2. Add each variable below. Use the same values as in your local `.env` (from Firebase Console → Project settings → Your apps).

| Variable | Example | Required for |
|---------|---------|---------------|
| `VITE_FIREBASE_API_KEY` | (from Firebase) | PDF + any Firebase |
| `VITE_FIREBASE_AUTH_DOMAIN` | `your-project.firebaseapp.com` | PDF + any Firebase |
| `VITE_FIREBASE_PROJECT_ID` | `your-project` | PDF + any Firebase |
| **`VITE_FIREBASE_STORAGE_BUCKET`** | **`portfoliojw26.firebasestorage.app`** | **PDF (required)** |
| `VITE_FIREBASE_APP_ID` | (from Firebase) | PDF + any Firebase |

3. **Redeploy**: **Deploys** → **Trigger deploy** → **Deploy site** (so the new env vars are used).

If `VITE_FIREBASE_STORAGE_BUCKET` is missing, the GBR page will show a friendly “PDF viewer not available” message instead of the PDF.
