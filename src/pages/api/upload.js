import prisma from 'lib/prisma';
import { getSession } from 'next-auth/react';

import middleware from 'middleware/middleware';
import nextConnect from 'next-connect';

import upload from 'lib/upload';

const handler = nextConnect();
handler.use(middleware);

handler.post(async (req, res) => {
  const session = await getSession({ req });
  if (!session) return res.status(401).json({ message: 'Not logged in' });

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (!user) return res.status(401).json({ message: 'User does not exist' });

  const video = await prisma.video.create({
    data: {
      title: req.body.title[0],
      visibility: 'public',
      length: parseInt(req.body.duration[0]),
      thumbnail: '',
      url: '',
      author: {
        connect: { id: user.id },
      },
    },
  });

  if (req.files) {
    const thumbnailURL = await upload({
      file: req.files.image[0],
      userId: user.id,
    });

    const videoURL = await upload({
      file: req.files.video[0],
      userId: user.id,
    });

    await prisma.video.update({
      where: { id: video.id },
      data: {
        thumbnail: thumbnailURL,
        url: videoURL,
      },
    });
  }

  res.end();
  return;
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
