'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabaseBrowser } from '@/lib/supabase';

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const s = supabaseBrowser();
    s.auth.getSession().then(({ data }) => router.replace(data.session ? '/dashboard' : '/login'));
  }, [router]);
  return <main className="center"><div className="card"><p>Memuat Mutaba’ah RUMUZ…</p></div></main>;
}
