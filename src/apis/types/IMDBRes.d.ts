type WidthRes = number;
type HeightRes = number;
type Year = number;
type URL = string;
type MovieTitle = string;
type MainActors = string;

export type ImageDescriptor = [URL, WidthRes, HeightRes];

export interface IMDBResMovieInfo {
    l: string;
    id: string;
    s: string;
    i: ImageDescriptor[];
}

export interface IMDBResSearchResults {
    l: MovieTitle;
    id: string;
    s: MainActors;
    y: Year;
    q: string;
    vt: number;
    i: ImageDescriptor[];
    v: IMDBResMovieInfo[];
    yr: string;
}

export interface IMDBRes {
    v: number;
    q: string;
    d: IMDBResSearchResults[];
}