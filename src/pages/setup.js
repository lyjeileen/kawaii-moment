import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

import Button from 'components/Button';
import LoginMessage from 'components/LoginMessage';

export default function Setup() {
  const { data: session, status } = useSession();
  const loading = status === 'loading';

  const [name, setName] = useState('');
  const [imageURL, setImageURL] = useState(null);
  const [image, setImage] = useState(null);
  const [isSaved, setIsSaved] = useState(false);

  if (loading) return null;
  if (!session || !session.user) return <LoginMessage />;

  return (
    <>
      {isSaved && (
        <div
          className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 m-auto w-fit"
          role="alert"
        >
          <p className="font-bold">You have saved your profile successfully!</p>
        </div>
      )}

      <div className="m-auto flex flex-col w-fit text-amber-800">
        <h1 className="font-bold text-xl my-10 text-center">
          Set up your profile
        </h1>

        <form
          className="p-10 pb-4 border-2 border-amber-800 rounded-md"
          onSubmit={async (e) => {
            e.preventDefault();

            //clear previous banner
            setIsSaved(false);

            const body = new FormData();
            body.append('image', image);
            body.append('name', name);

            await fetch('/api/setup', {
              body,
              method: 'POST',
            });

            setIsSaved(true);

            session.user.name = name;
            session.user.image = image;
          }}
        >
          <div className="my-2">Name</div>
          <input
            type="text"
            name="name"
            required
            value={name}
            className="border p-1 border-amber-800 rounded-md"
            onChange={(e) => setName(e.target.value)}
          />
          <label className="cursor-pointer">
            <div className="my-2">Avatar</div>
            <div className="border p-1 border-amber-800 rounded-md bg-white">
              {!imageURL ? (
                <p>Upload image</p>
              ) : (
                <Image
                  className="rounded-full h-8"
                  src={imageURL}
                  alt="Image"
                  width={32}
                  height={32}
                />
              )}

              <input
                name="image"
                type="file"
                accept="image/*"
                className="hidden"
                required
                onChange={(event) => {
                  if (event.target.files && event.target.files[0]) {
                    if (event.target.files[0].size > 3072000) {
                      alert('Maximum size allowed is 3MB');
                      return false;
                    }

                    setImage(event.target.files[0]);
                    //URL.createObjectURL return a string containing an object URL that can be used to reference the contents of the specified source object
                    setImageURL(URL.createObjectURL(event.target.files[0]));
                  }
                }}
              />
            </div>
          </label>
          <div className="my-6 text-center">
            <Button text="Save" />
          </div>
        </form>
      </div>
    </>
  );
}
