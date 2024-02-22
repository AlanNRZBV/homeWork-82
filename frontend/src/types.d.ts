export interface Artist {
  _id: string,
  name: string,
  image: string | null,
  information: string
}

type ArtistOnlyName = Omit<Artist, 'image', 'information'>

export interface Album {
  _id?:string,
  title: string,
  artistId?: ArtistOnlyName,
  cover: string | null,
  releaseDate: string
}