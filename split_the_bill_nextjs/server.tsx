import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';
import { PrismaClient, Users } from '@prisma/client';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const prisma = new PrismaClient();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url!, true);
      const { pathname } = parsedUrl;

      if (pathname === '/api/users') {
        const users: Users[] = await prisma.users.findMany();
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;
        res.end(JSON.stringify(users));
        return;
      }

      handle(req, res, parsedUrl);
    } catch (error) {
      console.error('Error:', error);
      res.statusCode = 500;
      res.end('Internal Server Error');
    }
  }).listen(3000, () => {
    console.log('Server started on http://localhost:3000');
  });
});
