import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: "Mutaba'ah RUMUZ",
  description: "Sistem Mutaba'ah Halaqoh Qur'an Mahasiswa RUMUZ for Islamic School Managers"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="id"><body>{children}</body></html>;
}
