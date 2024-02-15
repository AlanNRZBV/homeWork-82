import express, { Router } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import config from './config';
import tracksRouter from './routers/tracks';
import albumsRouter from './routers/albums';
import artistsRouter from './routers/artists';
import usersRouter from './routers/users';
import trackHistoryRouter from './routers/trackHistory';

const app = express();
const port = 8000;

app.use(express.static('public'));
app.use(express.json());
app.use(cors());

app.use('/albums', albumsRouter);
app.use('/artists', artistsRouter);
app.use('/tracks', tracksRouter);
app.use('/users', usersRouter);
app.use('/track_history', trackHistoryRouter);

const run = async () => {
  await mongoose.connect(config.mongoose.db);

  app.listen(port, () => {
    console.log(`Server started on port: ${port} `);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  });
};

void run();
