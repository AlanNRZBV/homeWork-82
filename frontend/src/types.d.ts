import { Moment } from 'moment';

export interface Artist {
  _id: string;
  name: string;
  image: string | null;
  information: string;
  isPublished?: boolean
}

type ArtistOnlyName = Omit<Artist, 'image', 'information'>;

export interface Album {
  _id: string;
  title: string;
  artistId?: ArtistOnlyName;
  cover: string | null;
  releaseDate: string;
  isPublished?: boolean
}
export interface AlbumMutation {
  title: string,
  artistId: string,
  cover: File | null,
  releaseDate: string
}

export interface Track {
  _id: string;
  title: string;
  albumId: string;
  duration: string;
  position: string;
  isPublished?: boolean
}

export interface TrackReduced {
  _id: string;
  title: string;
  duration: string;
  isPublished: boolean
}

export interface RegisterMutation {
  username: string;
  password: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface User {
  _id: string;
  username: string;
  token: string;
  role:string
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    }
  },

}

export interface RegisterResponse {
  message: string;
  user: User;
}

export interface GlobalError {
  error: string;
}
export interface RegisterResponse {
  message: string
  user: User
}

export interface TrackHistory {
  _id?: string;
  trackId: {_id: string, title: string};
  datetime:string
}

