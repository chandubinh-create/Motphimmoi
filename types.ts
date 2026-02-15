
export interface MovieItem {
  name: string;
  slug: string;
  origin_name: string;
  thumb_url: string;
  poster_url: string;
  year: number;
  lang?: string;
  quality?: string;
  episode_current?: string;
}

export interface EpisodeData {
  name: string;
  slug: string;
  filename: string;
  link_embed: string;
  link_m3u8: string;
}

export interface ServerData {
  server_name: string;
  server_data: EpisodeData[];
}

export interface MovieDetail {
  name: string;
  slug: string;
  origin_name: string;
  content: string;
  type: string;
  status: string;
  thumb_url: string;
  poster_url: string;
  is_copyright: boolean;
  sub_docquyen: boolean;
  chieurap: boolean;
  trailer_url: string;
  time: string;
  episode_current: string;
  episode_total: string;
  quality: string;
  lang: string;
  notify: string;
  showtimes: string;
  year: number;
  view: number;
  actor: string[];
  director: string[];
  category: { id: string; name: string; slug: string }[];
  country: { id: string; name: string; slug: string }[];
}

export interface OPhimDetailResponse {
  status: boolean;
  msg: string;
  movie: MovieDetail;
  episodes: ServerData[];
}

export interface User {
  username: string;
  isLoggedIn: boolean;
  favorites: string[]; // Danh sách slug phim
}
