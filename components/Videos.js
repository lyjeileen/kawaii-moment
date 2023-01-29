import Video from 'components/Video';

export default function Videos({ videos }) {
  return videos.map((video) => {
    return <Video key={video.id} video={video} />;
  });
}
