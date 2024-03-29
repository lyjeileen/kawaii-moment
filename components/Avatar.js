import Image from 'next/image';

export default function Avatar({ image }) {
  if (image) {
    return (
      <div className="h-min">
        <Image
          className="rounded-full w-10 h-10"
          src={image}
          alt="Author name"
          width={40}
          height={40}
        />
      </div>
    );
  }

  return (
    //show a placeholder icon for the user profile when there is no custom image available
    <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 ">
      <svg
        className="absolute w-10 h-10 text-gray-400"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
          clipRule="evenodd"
        ></path>
      </svg>
    </div>
  );
}
