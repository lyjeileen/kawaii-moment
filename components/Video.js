import Image from 'next/image';
import Avatar from 'components/Avatar';
import timeago from 'lib/timeago';

const calculateTime = (length) => {
  let hr;
  let min = '00';
  let sec = '00';
  let result = [];

  if (length >= 3600) {
    hr = Math.floor(length / 3600);
    result.push(hr);
    length = length % 3600;
  }
  if (length >= 60) {
    min = Math.floor(length / 60);
    sec = length % 60;
    result.push(min, sec);
  }

  result.forEach((input, index) => {
    if (result[index - 1]) {
      if (input < 10) {
        result[index] = '0' + input;
      }
    }
  });
  return result.join(':');
};
export default function Video({ video }) {
  const postTime = timeago.format(new Date(video.createdAt));

  return (
    <div className="aspect-sqaure md:m-4">
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
        <p className="absolute bottom-2 right-2 text-white text-xs font-semibold bg-black opacity-80 border border-black rounded-md">
          {/* {new Date(video.length * 1000).toISOString().substring(11, 16)} */}
          {calculateTime(video.length)}
        </p>
      </div>
      <div className="flex m-2">
        <Avatar image={video.author.image} />
        <div className="ml-2">
          <p className="font-semibold">{video.title}</p>
          <div className="text-xs text-gray-700">
            <p>{video.author.name}</p>
            <span>
              {video.views} views · {postTime}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
