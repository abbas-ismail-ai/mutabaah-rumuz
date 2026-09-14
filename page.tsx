'use client';
import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabaseBrowser } from '@/lib/supabase';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => { supabaseBrowser().auth.getSession().then(({data}) => { if (data.session) router.replace('/dashboard'); }); }, [router]);

  async function submit(e: FormEvent) {
    e.preventDefault(); setError(''); setLoading(true);
    const s = supabaseBrowser();
    const normalized = username.trim().toLowerCase().replace(/\s+/g,'');
    const { data: profile, error: pErr } = await s.rpc('find_login_email', { p_username: normalized });
    if (pErr || !profile) { setError('Username atau password salah.'); setLoading(false); return; }
    const { error: aErr } = await s.auth.signInWithPassword({ email: profile.email, password });
    if (aErr) setError('Username atau password salah.'); else router.replace('/dashboard');
    setLoading(false);
  }

  return <main className="center"><section className="auth-card">
    <div className="brand-mark">R</div><p className="eyebrow">RUMUZ FOR ISLAMIC SCHOOL MANAGERS</p>
    <h1>Mutaba’ah Halaqoh Qur’an</h1><p className="muted">Silakan masuk untuk mengakses mutaba’ah.</p>
    <form onSubmit={submit} className="stack">
      <label>Username<input value={username} onChange={e=>setUsername(e.target.value)} placeholder="contoh: salman" autoComplete="username" required /></label>
      <label>Password<input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Masukkan password" autoComplete="current-password" required /></label>
      {error && <div className="alert">{error}</div>}
      <button className="primary" disabled={loading}>{loading ? 'Memproses…' : 'Masuk'}</button>
    </form>
  </section></main>;
}
