export interface Artist {
  _id: string;
  name: string;
  image: string | null;
  information: string;
}

type ArtistOnlyName = Omit<Artist, 'image', 'information'>;

export interface Album {
  _id?: string;
  title: string;
  artistId?: ArtistOnlyName;
  cover: string | null;
  releaseDate: string;
}

export interface Track {
  _id: string;
  title: string;
  albumId: string;
  duration: string | null;
  position: string;
}

export interface AlbumAndTrackData {
  album: Album;
  tracks: Track[];
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
  _id: string;
  userId: string
  albumId: {_id: string, title: string};
  datetime:string
}
