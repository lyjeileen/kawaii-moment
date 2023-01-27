import AWS from 'aws-sdk';
import prisma from 'lib/prisma';
import { faker } from '@faker-js/faker';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.end();

  if (req.body.task === 'generate_content') {
    let usersCount = 0;
    while (usersCount < 10) {
      await prisma.user.create({
        data: {
          name: faker.internet.userName().toLowerCase(),
          email: faker.internet.email().toLowerCase(),
          image: faker.image.avatar(),
        },
      });
      usersCount++;
    }

    const s3 = new AWS.S3({
      acessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_S3_SECRET_ACESS_KEY,
    });

    const videoURL =
      'https://lyjeileen.s3.ca-central-1.amazonaws.com/big_buck_bunny_720p_2mb.mp4';
    const thumbnailURL =
      'https://lyjeileen.s3.ca-central-1.amazonaws.com/5366563581_3663091e9f_c+(1).jpg';

    const users = await prisma.user.findMany();
    const getRandomUser = () => {
      const randomIndex = Math.floor(Math.random() * users.length);
      return users[randomIndex];
    };
    let videosCount = 0;

    while (videosCount < 20) {
      await prisma.video.create({
        data: {
          title: faker.lorem.words(),
          thumbnail: thumbnailURL,
          url: videoURL,
          length: faker.datatype.number(1000),
          visibility: 'public',
          views: faker.datatype.number(1000),
          author: {
            connect: { id: getRandomUser().id },
          },
        },
      });
      videosCount++;
    }
  }

  if (req.body.task === 'clear_database') {
    await prisma.user.deleteMany({});
  }

  res.end();
}
