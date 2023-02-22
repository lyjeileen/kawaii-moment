import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from 'src/pages/api/auth/[...nextauth]';

import prisma from 'lib/prisma';
import { getVideos } from 'lib/data';
import { amount } from 'lib/config';

import Videos from '/components/Videos';
import LoadMore from '/components/LoadMore';
import LoginMessage from '/components/LoginMessage';

export default function Subscriptions({ initialVideos }) {
  const { data: session, status } = useSession();
  const [videos, setVideos] = useState(initialVideos);
  const [end, setEnd] = useState(initialVideos.length < amount);

  const loading = status === 'loading';

  if (loading) {
    return null;
  }

  if (!session) {
    return <LoginMessage />;
  }

  return (
    <>
      {videos.length === 0 && (
        <h1 className="flex justify-center mt-10">No videos found</h1>
      )}
      <Videos videos={videos} />
      {!end && (
        <LoadMore
          videos={videos}
          setVideos={setVideos}
          setEnd={setEnd}
          subscriptions={session.user.id}
        />
      )}
    </>
  );
}

export const getServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  let videos = await getVideos({ subscriptions: session.user.id }, prisma);
  videos = JSON.parse(JSON.stringify(videos));

  return { props: { initialVideos: videos } };
};
