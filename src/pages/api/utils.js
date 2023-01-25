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
  }

  if (req.body.task === 'clear_database') {
    await prisma.user.deleteMany({});
  }

  res.end();
}
