import Image from 'next/image';
import Avatar from '/components/Avatar';
export default function Video({ video }) {
  return (
    <div className="aspect-sqaure border md:m-4">
      <div className="relative aspect-video">
        <Image
          alt={video.title}
          src={video.thumbnail}
          fill
          sizes="(max-width: 640px) 100vw,
              (max-width: 768px) 50vw,
              33vw"
          className="border rounded-lg"
        />
      </div>
      <div className="flex m-2">
        <Avatar image={video.author.image} />
        <div className="ml-2">
          <p className="font-semibold">{video.title}</p>
          <p>{video.author.name}</p>
          <span>{video.views} views - </span>
          <span>{video.createdAt}</span>
        </div>
      </div>
    </div>
  );
}
