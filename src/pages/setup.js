import { useState } from 'react';
import Image from 'next/image';
import Avatar from 'components/Avatar';
import Button from 'components/Button';

export default function Setup() {
  const [name, setName] = useState('');
  const [imageURL, setImageURL] = useState(null);
  const [image, setImage] = useState(null);
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();

        await fetch('/api/setup', {
          body: JSON.stringify({
            name,
            image,
          }),
          method: 'POST',
        });
      }}
    >
      <div>Name</div>
      <input
        type="text"
        name="name"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label className="relative font-medium cursor-pointer my-3 block">
        <div>Avatar</div>
        <Avatar image={image} />
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
              setImageURL(URL.createObjectURL(event.target.files[0]));
            }
          }}
        />
      </label>
      <Button text="Save" />
    </form>
  );
}
