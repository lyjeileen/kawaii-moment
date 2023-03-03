import AWS from 'aws-sdk';
import prisma from 'lib/prisma';
import { faker } from '@faker-js/faker';

const API_KEY = process.env.NEXT_PUBLIC_PEXELS_API_KEY;

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

    //get videos from pexels
    const res = await fetch(
      `https://api.pexels.com/videos/search?query=cute&per_page=40`,
      {
        headers: {
          Authorization: API_KEY,
        },
      }
    );
    const responseJson = await res.json();

    const users = await prisma.user.findMany();
    const getRandomUser = () => {
      const randomIndex = Math.floor(Math.random() * users.length);
      return users[randomIndex];
    };

    const videos = responseJson.videos;
    videos.forEach(async (video) => {
      await prisma.video.create({
        data: {
          title: faker.lorem.words(),
          thumbnail: video.video_pictures[0].picture,
          url: video.video_files[0].link,
          length: video.duration,
          visibility: 'public',
          views: faker.datatype.number(1000),
          author: {
            connect: { id: getRandomUser().id },
          },
        },
      });
    });
  }

  if (req.body.task === 'clear_database') {
    await prisma.user.deleteMany({});
  }

  res.end();
}
