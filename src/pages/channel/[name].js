import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from 'src/pages/api/auth/[...nextauth]';
import {
  getSubscribersCount,
  getUser,
  getVideos,
  isSubscribed,
} from 'lib/data';
import prisma from 'lib/prisma';
import { amount } from 'lib/config';

import Avatar from 'components/Avatar';
import Videos from 'components/Videos';
import LoadMore from 'components/Loadmore';
import Button from 'components/Button';

export default function Channel({
  user,
  initialVideos,
  subscribers,
  subscribed,
}) {
  const [videos, setVideos] = useState(initialVideos);
  const [end, setEnd] = useState(initialVideos.length < amount);
  const [isSubscribe, setIsSubscribe] = useState(subscribed);
  const [subscriberCount, setSubscriberCount] = useState(subscribers);

  const { data: session, status } = useSession();

  const loading = status === 'loading';

  if (loading) {
    return null;
  }

  if (!user) {
    return <p className="text-center p-5">Channel not found 😞</p>;
  }

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between p-3 m-4 border-b-2 border-double border-slate-400">
        <div className="flex">
          <Avatar image={user.image} />
          <div className="ml-4">
            <p className="text-xl text-semibold ">
              {user.name.toUpperCase()}&apos;s Channel
            </p>
            <p className="text-sm text-gray-700">
              {subscriberCount}
              {subscriberCount > 1 ? ' subscribers' : ' subscriber'}
            </p>
          </div>
        </div>

        {/* only show subscribe button when logged in and not the owner of this channel */}
        {session && user.id !== session.user.id && (
          <Button
            text={isSubscribe ? 'Subscribed' : 'Subscribe'}
            onClick={async () => {
              await fetch(`/api/${isSubscribe ? 'unsubscribe' : 'subscribe'}`, {
                body: JSON.stringify({ subscribeTo: user.id }),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST',
              });

              //change subscribercount and subscribe button
              isSubscribe
                ? setSubscriberCount(subscriberCount - 1)
                : setSubscriberCount(subscriberCount + 1);

              setIsSubscribe(!isSubscribe);
            }}
          />
        )}
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
  console.log(user);
  let videos = await getVideos({ author: user.id }, prisma);
  videos = JSON.parse(JSON.stringify(videos));

  const subscribers = await getSubscribersCount(context.params.name, prisma);

  const session = await getServerSession(context.req, context.res, authOptions);
  let subscribed = false;
  if (session) {
    subscribed = await isSubscribed(session.user.id, user.id, prisma);
  }

  return {
    props: { user, subscribers, subscribed, initialVideos: videos },
  };
};
