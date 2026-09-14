# Mutaba'ah RUMUZ

Website Mutaba'ah Halaqoh Qur'an untuk Mahasiswa RUMUZ for Islamic School Managers.

## Hak akses
- Mahasiswa: hanya melihat mutaba'ah dirinya sendiri.
- Pengampu: melihat dan mengedit mutaba'ah seluruh mahasiswa.
- Admin: seluruh akses database.

## Stack
- Next.js
- Supabase Auth + PostgreSQL + Row Level Security
- Vercel untuk deployment

## Jalankan lokal
1. Install Node.js LTS.
2. `npm install`
3. Salin `.env.example` menjadi `.env.local` lalu isi URL dan publishable/anon key Supabase.
4. Jalankan isi `supabase/schema.sql` di Supabase SQL Editor.
5. Tambahkan `SUPABASE_SERVICE_ROLE_KEY` ke `.env.local` hanya untuk proses seed akun.
6. `node scripts/seed-users.mjs`
7. Hapus/keluarkan `SUPABASE_SERVICE_ROLE_KEY` dari `.env.local` setelah seed selesai.
8. `npm run dev`
9. Buka `http://localhost:3000`

## Penting
Jangan pernah mengunggah `.env.local` atau service-role key ke GitHub. GitHub juga mengingatkan agar password/API key tidak dimasukkan ke repository. Lihat `.gitignore` yang sudah disediakan.
