export interface Artist {
  _id: string;
  name: string;
  image: string | null;
  information: string;
  isPublished?: boolean;
}
export interface ArtistMutation {
  name: string;
  image: File | null;
  information: string;
}

type ArtistOnlyName = Omit<Artist, 'image', 'information'>;

export interface Album {
  _id: string;
  title: string;
  artistId?: ArtistOnlyName;
  cover: string | null;
  releaseDate: string;
  isPublished?: boolean;
}
export interface AlbumMutation {
  title: string;
  artistId: string;
  cover: File | null;
  releaseDate: string;
}

export interface TrackMutation {
  title: string;
  albumId: string;
  duration: number;
  position: number;
}
export interface TrackReduced {
  _id: string;
  title: string;
  duration: string;
  isPublished: boolean;
}

export interface RegisterMutation {
  email: string;
  password: string;
  displayName: string;
  avatar: File | null;
}

export interface LoginMutation {
  email: string;
  password: string;
}

export interface User {
  _id: string;
  email: string;
  token: string;
  role: string;
  displayName: string;
  avatar?: string;
  googleID?: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
}

export interface RegisterResponse {
  message: string;
  user: User;
}

export interface GlobalError {
  error: string;
}
export interface RegisterResponse {
  message: string;
  user: User;
}

export interface TrackHistory {
  _id?: string;
  trackId: { _id: string; title: string };
  datetime: string;
}
