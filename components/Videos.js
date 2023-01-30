import Video from 'components/Video';

export default function Videos({ videos }) {
  const videoList = videos.map((video) => {
    return <Video key={video.id} video={video} />;
  });
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {videoList}
    </div>
  );
}
