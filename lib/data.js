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
