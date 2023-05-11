import { useSession } from 'next-auth/react';

import { Profile } from 'components/Profile';
import LoginMessage from 'components/LoginMessage';

export default function Setup() {
  const { data: session, status } = useSession();
  const loading = status === 'loading';
  const userName = session?.user?.name;

  if (loading) return null;
  if (!userName) return <LoginMessage />;

  return <Profile userNameFromSession={userName} />;
}
