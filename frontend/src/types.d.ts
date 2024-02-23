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
