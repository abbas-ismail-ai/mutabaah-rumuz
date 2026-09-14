# Panduan Setup — Mutaba'ah RUMUZ

## A. GitHub
Buat repository baru bernama `mutabaah-rumuz`. Tidak perlu membuat file tambahan bila nanti mengunggah seluruh folder project ini.

## B. Supabase
1. Buat project baru di Supabase.
2. Buka SQL Editor dan jalankan seluruh isi `supabase/schema.sql`.
3. Ambil Project URL dan publishable/anon key dari Project Connect/API.
4. Simpan di `.env.local`.
5. Isi juga Service Role Key sementara untuk `scripts/seed-users.mjs`.

## C. Buat akun awal
Jalankan:
`npm install`
`node scripts/seed-users.mjs`

Script menyiapkan 25 akun awal dari data RUMUZ yang diberikan dalam percakapan.

## D. Jalankan
`npm run dev`

## E. Deploy ke Vercel
1. Push repository ke GitHub.
2. Di Vercel pilih Add New > Project.
3. Import repository `mutabaah-rumuz`.
4. Tambahkan Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Deploy.

JANGAN masukkan `SUPABASE_SERVICE_ROLE_KEY` ke Vercel untuk versi ini dan jangan pernah commit key tersebut ke GitHub.
