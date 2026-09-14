'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabaseBrowser } from '@/lib/supabase';

type Row={id:number; tanggal:string; setoran:string; ziyadah:string; murojaah:string; halaqoh:string; tahsin:string; catatan:string};
type Profile={full_name:string; gender:string; username:string};
export default function Mahasiswa(){
 const router=useRouter(); const [profile,setProfile]=useState<Profile|null>(null); const [rows,setRows]=useState<Row[]>([]); const [loading,setLoading]=useState(true); const s=supabaseBrowser();
 useEffect(()=>{(async()=>{const {data:user}=await s.auth.getUser(); if(!user.user){router.replace('/login');return;} const {data:p}=await s.from('profiles').select('full_name,gender,username,role').eq('id',user.user.id).single(); if(!p||p.role!=='mahasiswa'){router.replace('/dashboard');return;} setProfile(p); const {data:r}=await s.from('mutabaah').select('*').eq('student_id',user.user.id).order('tanggal',{ascending:false}); setRows(r??[]); setLoading(false);})();},[]);
 async function logout(){await s.auth.signOut();router.replace('/login');}
 if(loading)return <main className="center"><div className="card">Memuat data…</div></main>;
 return <main className="shell"><header className="topbar"><div><p className="eyebrow">MUTABA’AH RUMUZ</p><h2>{profile?.full_name}</h2></div><button className="ghost" onClick={logout}>Keluar</button></header><section className="hero"><div><span className="pill">MAHASISWA · VIEWER</span><h1>Riwayat Mutaba’ah</h1><p>Data kamu dapat dilihat di sini. Perubahan hanya dilakukan oleh pengampu.</p></div><div className="stat"><b>{rows.length}</b><span>catatan</span></div></section><section className="card table-wrap"><table><thead><tr><th>Tanggal</th><th>Setoran</th><th>Ziyadah</th><th>Muroja’ah</th><th>Halaqoh</th><th>Tahsin</th><th>Catatan</th></tr></thead><tbody>{rows.length?rows.map(r=><tr key={r.id}><td>{r.tanggal}</td><td>{r.setoran}</td><td>{r.ziyadah}</td><td>{r.murojaah}</td><td>{r.halaqoh}</td><td>{r.tahsin}</td><td>{r.catatan}</td></tr>):<tr><td colSpan={7} className="empty">Belum ada mutaba’ah.</td></tr>}</tbody></table></section></main>;
}
