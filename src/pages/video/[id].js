import prisma from 'lib/prisma';
import { getVideo } from 'lib/data';
import Avatar from 'components/Avatar';
import timeago from 'lib/timeago';
//lazy load the player for url, reduce main bundle size
import dynamic from 'next/dynamic';
const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });

export default function SingleVideo({ video }) {
  if (!video) return <p>Video not found</p>;
  const postTime = timeago.format(new Date(video.createdAt));

  return (
    <div className="p-4">
      <ReactPlayer
        className="aspect-video"
        url={video.url}
        width="100%"
        height="100%"
        controls={true}
        light={video.thumbnail}
      />
      <p className="font-bold text-xl mt-2">{video.title}</p>
      <p className="text-xs text-gray-700">
        {video.views} views · {postTime}
      </p>
      <div className="flex mt-2">
        <Avatar image={video.author.image} />
        <p className="text-xl ml-2">{video.author.name}</p>
      </div>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  let video = await getVideo(context.params.id, prisma);
  video = JSON.parse(JSON.stringify(video));
  return {
    props: { video },
  };
};
