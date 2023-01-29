import Image from 'next/image';

export default function Video({ video }) {
  return (
    <>
      <Image
        alt={video.title}
        src={video.thumbnail}
        width={300}
        height={500}
      ></Image>
      <p>{video.title}</p>
    </>
  );
}
