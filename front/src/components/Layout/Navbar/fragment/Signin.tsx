import { GetServerSideProps } from 'next';
import { Session } from 'next-auth';
import { getSession, useSession, signIn, signOut } from 'next-auth/react';

interface ComponentProps {
  session: Session;
}

export default function Component({ session }: ComponentProps) {
  // const { data: session } = useSession();

  if (session) {
    return (
      <>
        Signed in as {session.user?.name} <br />
        <button onClick={() => fetch('api/nfts')}>get session</button>
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}
