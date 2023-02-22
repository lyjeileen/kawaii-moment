import { useEffect } from 'react';

import prisma from 'lib/prisma';
import { getVideo, getVideos } from 'lib/data';
import timeago from 'lib/timeago';

import Avatar from 'components/Avatar';
import Video from 'components/Video';

//lazy load the player for url, reduce main bundle size
import dynamic from 'next/dynamic';
const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });

export default function SingleVideo({ video, videos }) {
  useEffect(() => {
    if (video) {
      const incrementViews = async () => {
        await fetch('/api/view', {
          body: JSON.stringify({
            video: video.id,
          }),
          headers: { 'Content-Type': 'application/json' },
          method: 'POST',
        });
      };
      incrementViews();
    }
  }, []);

  if (!video) return <p className="p-4">Video not found</p>;

  const postTime = timeago.format(new Date(video.createdAt));
  const videoList = videos.map((video) => (
    <Video key={video.id} video={video} />
  ));
  return (
    <div className="flex p-4">
      <div className="w-full md:w-2/3">
        <div className="w-full aspect-video">
          <ReactPlayer
            className="aspect-video"
            url={video.url}
            width="100%"
            height="100%"
            controls={true}
            light={video.thumbnail}
          />
        </div>
        <p className="font-bold text-xl mt-2">{video.title}</p>
        <p className="text-xs text-gray-700">
          {video.views + 1} views · {postTime}
        </p>
        <div className="flex mt-2">
          <Avatar image={video.author.image} />
          <p className="text-xl ml-2">{video.author.name}</p>
        </div>
      </div>
      <div className="hidden md:block md:w-1/3">{videoList}</div>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  let video = await getVideo(context.params.id, prisma);
  video = JSON.parse(JSON.stringify(video));
  let videos = await getVideos({ take: 3 }, prisma);
  videos = JSON.parse(JSON.stringify(videos));
  return {
    props: { video, videos },
  };
};
