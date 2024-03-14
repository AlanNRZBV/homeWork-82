import { Model } from 'mongoose';

export interface IArtist {
  name: string;
  image: string | null;
  information: string;
}

export interface IAlbum {
  title: string;
  artistId: string;
  releaseDate: number;
  cover: string | null;
}

export interface ITrack {
  title: string;
  albumId: string;
  duration: string;
  position: string;
}

export interface IUser {
  email: string;
  password: string;
  displayName: string;
  avatar: string | null;
}

export interface UserFields {
  email: string;
  password: string;
  token: string;
  role: string;
  googleID: string;
  avatar: string;
  displayName: string;
}

export interface UserMethods {
  checkPassword(password: string): Promise<boolean>;
  generateToken(): void;
}

type UserModel = Model<UserField, object, UserMethods>;
