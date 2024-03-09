import mongoose from 'mongoose';
import config from './config';
import User from './models/User';
import * as crypto from 'crypto';
import Artist from './models/Artist';
import Album from './models/Album';
import Track from './models/Track';

const dropCollection = async (db: mongoose.Connection, collectionName: string) => {
  try {
    await db.dropCollection(collectionName);
  } catch (e) {
    console.log(`Collection ${collectionName} was missing, skipping drop`);
  }
};

const run = async () => {
  await mongoose.connect(config.mongoose.db);
  const db = mongoose.connection;

  try {
    const collections = ['albums', 'artists', 'users', 'tracks'];

    for (const collectionName of collections) {
      await dropCollection(db, collectionName);
    }

    await User.create([
      {
        username: 'user',
        password: '5str0ngPswrd',
        token: crypto.randomUUID(),
        role: 'client',
      },
      {
        username: 'admin',
        password: '5str0ngPswrd',
        token: crypto.randomUUID(),
        role: 'admin',
      },
    ]);

    await Artist.create([
      {
        name: 'NF',
        information:
          'NF raps with raw grit and emotional authenticity, born of a lifetime of taking hits and getting back up again. ' +
          'His intimate yet propulsive tracks received two consecutive No. 1 albums on the Billboard 200 with Perception and The Search. ',
        image: 'fixtures/artist_nf.jpg',
        isPublished: true,
      },
      {
        name: 'Shinedown',
        information:
          'Multi-platinum band Shinedown Brent Smith [vocals], Zach Myers [guitar], Eric Bass [bass, production], and Barry Kerch [drums] – have cemented their status as one of the most vital and forward-thinking powerhouses in modern rock. Their most ambitious and masterfully realized work to date, their seventh studio album Planet Zero firmly places the group in the pantheon of artists capable of moving the culture forward on the strength of their singular vision, uncompromising honesty, and fierce commitment to constant evolution. The record-breaking band have achieved astronomical success while embodying the kind of creative dynamism that defies expectation and transcends boundaries. They were named #1 on Billboard’s Greatest Of All Time Mainstream Rock Artists Chart, after notching the most ever #1s in the 40-year history of the Mainstream Rock Songs Chart with a string of consecutive #1 hit singles.',
        image: 'fixtures/artist_shinedown.jpg',
        isPublished: true,
      },
      {
        name: 'System Of a Down',
        information:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        image: 'fixtures/artist_soad.jpg',
        isPublished: false,
      },
    ]);

    const artistNf = await Artist.findOne({ name: 'NF' });
    const artistShinedown = await Artist.findOne({ name: 'Shinedown' });
    const artistSoad = await Artist.findOne({ name: 'System Of a Down' });

    await Album.create([
      {
        title: 'The Sound Of Madness',
        artistId: artistShinedown?._id,
        releaseDate: 2008,
        cover: 'fixtures/album_shinedown_sound_of_madness.jpeg',
        isPublished: true,
      },
      {
        title: 'Leave a Whisper',
        artistId: artistShinedown?._id,
        releaseDate: 2003,
        cover: 'fixtures/album_shinedown_leave_a_whisper.jpg',
        isPublished: true,
      },
      {
        title: 'Hope',
        artistId: artistNf?._id,
        releaseDate: 2023,
        cover: 'fixtures/album_nf_hope.png',
        isPublished: true,
      },
      {
        title: 'The Search',
        artistId: artistNf?._id,
        releaseDate: 2019,
        cover: 'fixtures/album_nf_search.png',
        isPublished: true,
      },
      {
        title: 'Toxicity',
        artistId: artistSoad?._id,
        releaseDate: 2001,
        cover: 'fixtures/album_soad_toxicity.jpeg',
        isPublished: false,
      },
    ]);

    const nfTheSearch = await Album.findOne({ title: 'The Search' });
    const nfHope = await Album.findOne({ title: 'Hope' });
    const shinedownTheSoundOfMadness = await Album.findOne({ title: 'The Sound Of Madness' });
    const shinedownLeaveAWhisper = await Album.findOne({ title: 'Leave a Whisper' });
    const soadToxicity = await Album.findOne({ title: 'Toxicity' });

    await Track.create([
      {
        title: 'The Search',
        albumId: nfTheSearch?._id,
        duration: '4:08',
        position: 1,
        isPublished: true,
      },
      {
        title: 'I Miss the Days',
        albumId: nfTheSearch?._id,
        duration: '4:29',
        position: 13,
        isPublished: true,
      },
      {
        title: 'When I Grow Up',
        albumId: nfTheSearch?._id,
        duration: '3:16',
        position: 8,
        isPublished: true,
      },
      {
        title: 'Change',
        albumId: nfTheSearch?._id,
        duration: '3:54',
        position: 3,
        isPublished: true,
      },
      {
        title: 'Hope',
        albumId: nfHope?._id,
        duration: '4:24',
        position: 1,
        isPublished: true,
      },
      {
        title: 'Motto',
        albumId: nfHope?._id,
        duration: '3:37',
        position: 2,
        isPublished: true,
      },
      {
        title: 'Happy',
        albumId: nfHope?._id,
        duration: '4:02',
        position: 5,
        isPublished: true,
      },
      {
        title: 'Careful',
        albumId: nfHope?._id,
        duration: '3:29',
        position: 3,
        isPublished: true,
      },
      {
        title: 'Devour',
        albumId: shinedownTheSoundOfMadness?._id,
        duration: '3:50',
        position: 1,
        isPublished: true,
      },
      {
        title: 'Sound of Madness',
        albumId: shinedownTheSoundOfMadness?._id,
        duration: '3:54',
        position: 2,
        isPublished: true,
      },
      {
        title: 'Second Chance',
        albumId: shinedownTheSoundOfMadness?._id,
        duration: '3:40',
        position: 3,
        isPublished: true,
      },
      {
        title: 'Call Me',
        albumId: shinedownTheSoundOfMadness?._id,
        duration: '3:43',
        position: 11,
        isPublished: true,
      },
      {
        title: 'Fly From the Inside',
        albumId: shinedownLeaveAWhisper?._id,
        duration: '3:55',
        position: 1,
        isPublished: true,
      },
      {
        title: 'Burning Bright',
        albumId: shinedownLeaveAWhisper?._id,
        duration: '3:46',
        position: 6,
        isPublished: true,
      },
      {
        title: '45',
        albumId: shinedownLeaveAWhisper?._id,
        duration: '4:09',
        position: 12,
        isPublished: true,
      },
      {
        title: 'All I Ever Wanted',
        albumId: shinedownLeaveAWhisper?._id,
        duration: '4:12',
        position: 8,
        isPublished: true,
      },
      {
        title: 'Prison song',
        albumId: soadToxicity?._id,
        duration: '3:21',
        position: 1,
        isPublished: false,
      },
      {
        title: 'Chop Suey',
        albumId: soadToxicity?._id,
        duration: '3:30',
        position: 6,
        isPublished: false,
      },
      {
        title: 'Aerials',
        albumId: soadToxicity?._id,
        duration: '3:56',
        position: 14,
        isPublished: false,
      },
    ]);

    await db.close();
  } catch (e) {
    console.log('Collection were missing, skipping drop');
  }
};

void run();
