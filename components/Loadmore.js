import { amount } from 'lib/config';

export default function Loadmore({ videos, setVideos }) {
  return (
    <div className="flex justify-center">
      <button
        className="px-8 py-2 m-8 text-amber-800 border border-amber-800 rounded-full"
        onClick={async () => {
          //use api query string to add skip
          const res = await fetch(`/api/videos?skip=${videos.length}`);
          //save res in data
          const data = await res.json();
          //combine previous videos and new videos
          setVideos([...videos, ...data]);
        }}
      >
        Load More
      </button>
    </div>
  );
}
