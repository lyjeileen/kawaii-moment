import { getUser, getVideos } from 'lib/data';
import prisma from 'lib/prisma';
import Avatar from 'components/Avatar';
import Videos from 'components/Videos';

export default function Channel({ user, videos }) {
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
    </>
  );
}

export const getServerSideProps = async (context) => {
  let user = await getUser(context.params.name, prisma);
  user = JSON.parse(JSON.stringify(user));
  let videos = await getVideos({ author: context.params.name }, prisma);
  videos = JSON.parse(JSON.stringify(videos));
  return {
    props: { user, videos },
  };
};
