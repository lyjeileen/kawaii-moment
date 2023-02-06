import { useState } from 'react';

import { getUser, getVideos } from 'lib/data';
import prisma from 'lib/prisma';
import { amount } from 'lib/config';

import Avatar from 'components/Avatar';
import Videos from 'components/Videos';
import LoadMore from 'components/LoadMore';

export default function Channel({ user, initialVideos }) {
  const [videos, setVideos] = useState(initialVideos);
  const [end, setEnd] = useState(initialVideos.length < amount);

  if (!user) {
    return <p className="text-center p-5">Channel not found 😞</p>;
  }

  return (
    <>
      <div className="flex p-3 m-4 border-b-2 border-double border-slate-400">
        <Avatar image={user.image} />
        <p className="text-xl text-semibold ml-4">
          {user.name.toUpperCase()}&apos;s Channel
        </p>
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

  return {
    props: { user, initialVideos: videos },
  };
};
