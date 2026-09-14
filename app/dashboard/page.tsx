'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabaseBrowser } from '@/lib/supabase';

type Profile = { full_name: string; role: 'mahasiswa'|'pengampu'|'admin'; gender: string; username: string };
export default function Dashboard() {
  const router = useRouter(); const [p,setP]=useState<Profile|null>(null); const [err,setErr]=useState('');
  useEffect(()=>{
    const s=supabaseBrowser();
    s.auth.getUser().then(async ({data,error})=>{
      if(error||!data.user){router.replace('/login');return;}
      const {data:profile}=await s.from('profiles').select('full_name,role,gender,username').eq('id',data.user.id).single();
      if(!profile){setErr('Profil belum ditemukan.');return;} setP(profile);
      if(profile.role==='mahasiswa') router.replace('/mahasiswa'); else if(profile.role==='pengampu') router.replace('/pengampu');
    });
  },[router]);
  return <main className="center"><div className="card">{err?<p>{err}</p>:<p>Menyiapkan dashboard…</p>}</div></main>;
}
