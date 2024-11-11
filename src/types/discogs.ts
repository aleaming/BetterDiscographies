export interface Artist {
  id: number;
  name: string;
  realname?: string;
  profile?: string;
  uri: string;
  urls?: string[];
  images?: {
    uri: string;
    type: string;
  }[];
  members?: {
    id: number;
    name: string;
  }[];
}

export interface Release {
  id: number;
  title: string;
  year: string;
  thumb: string;
  format: string[];
  price?: string;
}