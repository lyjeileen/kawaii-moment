import { useState } from 'react';

import prisma from 'lib/prisma';
import { getVideos } from 'lib/data';
import { amount } from 'lib/config';

import Videos from '/components/Videos';
import LoadMore from '/components/LoadMore';

export default function Home({ initialVideos }) {
  const [videos, setVideos] = useState(initialVideos);
  const [end, setEnd] = useState(initialVideos.length < amount);

  return (
    <>
      {videos.length === 0 && <h1>No videos found</h1>}
      <Videos videos={videos} />
      {!end && (
        <LoadMore videos={videos} setVideos={setVideos} setEnd={setEnd} />
      )}
    </>
  );
}

export const getServerSideProps = async () => {
  let videos = await getVideos({}, prisma);
  videos = JSON.parse(JSON.stringify(videos));

  return { props: { initialVideos: videos } };
};
