import { useState } from 'react';

import Button from 'components/Button';
export default function Setup() {
  const [name, setName] = useState('');
  const [imageURL, setImageURL] = useState(null);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
      }}
    >
      <div>Name</div>
      <input
        type="text"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div>Avatar</div>
      <Button text="submit" />
    </form>
  );
}
