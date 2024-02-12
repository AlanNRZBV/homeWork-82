
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

