import middleware from 'middleware/middleware';
import nextConnect from 'next-connect';
import { getSession } from 'next-auth/react';
import upload from 'lib/upload';
import prisma from 'lib/prisma';

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

  if (!user) return res.status(401).json({ message: 'User not found' });

  await prisma.user.update({
    where: { id: user.id },
    data: {
      //because of form, name becomes an array
      name: req.body.name[0],
    },
  });

  if (req.files && req.files.image[0]) {
    //upload file to aws and save returned url to avatarUrl
    const avatarUrl = await upload({
      file: req.files.image[0],
      userId: user.id,
    });

    await prisma.user.update({
      where: { id: user.id },
      data: {
        image: avatarUrl,
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
