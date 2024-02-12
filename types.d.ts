
export interface IArtist {
  name: string,
  image: string | null,
  information: string
}


export interface IAlbum {
  title: string,
  artistId: string,
  releaseDate: string,
  cover: string | null
}

export interface ITrack {
  title: string,
  albumId: string,
  duration: string | null
}

