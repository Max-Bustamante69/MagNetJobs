// Layout.js (Server Component)
import { redirect } from 'next/navigation';
import { SessionProvider } from './SessionProvider';
import { getUserContext } from '@/utils/GetUserContext';

export default async function Layout({ children }) {
  const user = await getUserContext();
  if (!user) redirect('/login');

  return <SessionProvider value={user}>{children}</SessionProvider>;
}
