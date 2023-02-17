import { amount } from 'lib/config';

export const getVideos = async (options, prisma) => {
  const data = {
    where: {},
    orderBy: [
      {
        createdAt: 'desc',
      },
    ],
    include: { author: true },
  };

  data.take = options.take || amount;

  if (options.skip) data.skip = options.skip;

  if (options.author) {
    data.where = {
      author: { id: options.author },
    };
  }

  const videos = await prisma.video.findMany(data);
  return videos;
};

export const getVideo = async (id, prisma) => {
  return await prisma.video.findUnique({
    where: { id },
    include: { author: true },
  });
};

export const getUser = async (name, prisma) => {
  return await prisma.user.findUnique({
    where: { name },
  });
};

export const getSubscribersCount = async (name, prisma) => {
  const user = await prisma.user.findUnique({
    where: { name },
    include: { subscribers: true },
  });

  return user.subscribers.length;
};
