import { createClient } from '@supabase/supabase-js';
import fs from 'node:fs';
import 'dotenv/config';

const url=process.env.NEXT_PUBLIC_SUPABASE_URL;
const service=process.env.SUPABASE_SERVICE_ROLE_KEY;
if(!url||!service) throw new Error('Isi NEXT_PUBLIC_SUPABASE_URL dan SUPABASE_SERVICE_ROLE_KEY di .env.local');
if(!fs.existsSync('./scripts/users.local.json')) throw new Error('Buat scripts/users.local.json dari users.local.example.json, lalu isi 25 akun. File ini sudah di-ignore Git.');
const users=JSON.parse(fs.readFileSync('./scripts/users.local.json','utf8'));
const admin=createClient(url,service,{auth:{autoRefreshToken:false,persistSession:false}});
for(const u of users){
  const email=`${u.username.toLowerCase()}@mutabaah-rumuz.example`;
  const {data:found}=await admin.from('profiles').select('id').eq('username',u.username.toLowerCase()).maybeSingle();
  let id=found?.id;
  if(!id){
    const {data,error}=await admin.auth.admin.createUser({email,password:u.password,email_confirm:true,user_metadata:{full_name:u.full_name,username:u.username,role:u.role,gender:u.gender}});
    if(error) throw error; id=data.user.id;
  }
  const {error}=await admin.from('profiles').upsert({id,full_name:u.full_name,username:u.username.toLowerCase(),email,role:u.role,gender:u.gender},{onConflict:'id'});
  if(error) throw error;
  console.log(`OK ${u.username} (${u.role})`);
}
