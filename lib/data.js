export const getVideos = async (options, prisma) => {
  return await prisma.video.findMany({
    where: {},
    orderBy: [
      {
        createdAt: 'desc',
      },
    ],
    include: { author: true },
  });
};

export const getVideo = async (id, prisma) => {
  return await prisma.video.findUnique({
    where: { id },
    include: { author: true },
  });
};
