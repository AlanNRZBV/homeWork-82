import { Model } from 'mongoose';

export interface IArtist {
  name: string;
  image: string | null;
  information: string;
}

export interface IAlbum {
  title: string;
  artistId: string;
  releaseDate: string;
  cover: string | null;
}

export interface ITrack {
  title: string;
  albumId: string;
  duration: string | null;
}

export interface UserFields {
  username: string,
  password: string
  token: string
}

export interface UserMethods {
  checkPassword(password: string): Promise<boolean>;
  generateToken(): void;
}

type UserModel = Model<UserField, {}, UserMethods>