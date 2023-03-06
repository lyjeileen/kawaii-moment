import { amount } from 'lib/config';

export const getVideos = async (options, prisma) => {
  const data = {
    where: {},
    orderBy: [
      {
        createdAt: 'desc',
      },
      {
        id: 'desc',
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

  //for video page, not include repetitive videos
  if (options.exclude) {
    data.where = {
      NOT: { id: options.exclude },
    };
  }

  //options.subscriptions=logged-in user id, return user's subcriptions
  if (options.subscriptions) {
    const user = await prisma.user.findUnique({
      where: { id: options.subscriptions },
      include: {
        subscribedTo: true,
      },
    });

    //find all subcribed videos using channel/user id
    data.where = {
      authorId: {
        in: user.subscribedTo.map((channel) => channel.id),
      },
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

export const isSubscribed = async (id, isSubscribedTo, prisma) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      subscribedTo: { where: { id: isSubscribedTo } },
    },
  });

  return user.subscribedTo.length === 0 ? false : true;
};
