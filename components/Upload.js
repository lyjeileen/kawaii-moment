import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { useSession } from 'next-auth/react';

const getVideoDuration = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    //onload=>read file
    reader.onload = () => {
      //FileReader result returns the file's contents
      const media = new Audio(reader.result);
      //onloadedmetadata=> The duration and dimensions of the media and tracks are now known.
      media.onloadedmetadata = () => resolve(media.duration);
    };
    reader.readAsDataURL(file);
    reader.onerror = (error) => reject(error);
  });
};

export default function Upload() {
  const { data: session, status } = useSession();
  let [isOpen, setIsOpen] = useState(true);
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [duration, setDuration] = useState(null);

  if (status === 'loading') {
    return null;
  }

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
      >
        Upload Video
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex justify-between">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Upload New Video
                    </Dialog.Title>
                    {/* close button */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 hover:text-amber-800"
                      onClick={closeModal}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                  {session && session.user && (
                    <form
                      className="mt-8"
                      onSubmit={async (e) => {
                        e.preventDefault();

                        const body = new FormData();
                        body.append('image', image);
                        body.append('title', title);
                        body.append('video', video);
                        body.append('duration', duration);

                        await fetch('/api/upload', { body, method: 'POST' });
                      }}
                    >
                      <div>Title</div>
                      <input
                        type="text"
                        name="name"
                        className="border p-1"
                        onChange={(e) => setTitle(e.target.value)}
                        required
                      />
                      <div className="mt-4">
                        Video Thumbnail (800 x 450 suggested) {image && '✅'}
                      </div>
                      <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={(event) => {
                          if (event.target.files && event.target.files[0]) {
                            if (event.target.files[0].size > 3072000) {
                              alert('Maximum size allowed is 3MB');
                              return false;
                            }
                          }

                          setImage(event.target.files[0]);
                        }}
                        required
                      />
                      <div className="mt-4">Video File {video && '✅'}</div>
                      <input
                        name="video"
                        type="file"
                        accept="video/*"
                        required
                        onChange={async (event) => {
                          if (event.target.files && event.target.files[0]) {
                            if (event.target.files[0].size > 20971520) {
                              alert('Maximum size allowed is 20MB');
                              return false;
                            }
                            const duration = await getVideoDuration(
                              event.target.files[0]
                            );
                            setDuration(parseInt(duration));
                            setVideo(event.target.files[0]);
                          }
                        }}
                      />
                      <div className="mt-4">
                        <button
                          disabled={title && video && image ? false : true}
                          className={`border rounded-full py-1 px-3 m-2 font-bold text-amber-800 bg-[#FAEAB1] h-fit ${
                            title && video && image
                              ? 'hover:shadow-md'
                              : 'cursor-not-allowed'
                          }`}
                        >
                          Upload
                        </button>
                      </div>
                    </form>
                  )}

                  {(!session || !session.user) && (
                    <div className="mt-2">Please log in first.</div>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
