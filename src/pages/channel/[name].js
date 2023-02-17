import { useState } from 'react';

import { getSubscribersCount, getUser, getVideos } from 'lib/data';
import prisma from 'lib/prisma';
import { amount } from 'lib/config';

import Avatar from 'components/Avatar';
import Videos from 'components/Videos';
import LoadMore from 'components/LoadMore';

export default function Channel({ user, initialVideos, subscribers }) {
  const [videos, setVideos] = useState(initialVideos);
  const [end, setEnd] = useState(initialVideos.length < amount);

  if (!user) {
    return <p className="text-center p-5">Channel not found 😞</p>;
  }

  return (
    <>
      <div className="flex p-3 m-4 border-b-2 border-double border-slate-400">
        <Avatar image={user.image} />
        <div className="ml-4">
          <p className="text-xl text-semibold ">
            {user.name.toUpperCase()}&apos;s Channel
          </p>
          <p>
            {subscribers} {subscribers > 1 ? 'subscribers' : 'subscriber'}
          </p>
        </div>
      </div>
      <Videos videos={videos} />
      {!end && (
        <LoadMore
          videos={videos}
          setEnd={setEnd}
          setVideos={setVideos}
          author={user}
        />
      )}
    </>
  );
}

export const getServerSideProps = async (context) => {
  let user = await getUser(context.params.name, prisma);
  user = JSON.parse(JSON.stringify(user));
  let videos = await getVideos({ author: user.id }, prisma);
  videos = JSON.parse(JSON.stringify(videos));
  const subscribers = await getSubscribersCount(context.params.name, prisma);

  return {
    props: { user, subscribers, initialVideos: videos },
  };
};
