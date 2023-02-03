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

  if (options.take) {
    data.take = options.take;
  }

  if (options.author) {
    data.where = {
      author: { name: options.author },
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
