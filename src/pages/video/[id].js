import prisma from 'lib/prisma';
import { getVideo } from 'lib/data';
//lazy load the player for url, reduce main bundle size
import dynamic from 'next/dynamic';
const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });

export default function SingleVideo({ video }) {
  if (!video) return <p>Video not found</p>;
  return (
    <ReactPlayer
      className="react-player absolute top-1 left-0"
      url={video.url}
      width="100%"
      height="100%"
      controls={true}
      light={video.thumbnail}
    />
  );
}

export const getServerSideProps = async (context) => {
  let video = await getVideo(context.params.id, prisma);
  video = JSON.parse(JSON.stringify(video));
  return {
    props: { video },
  };
};
