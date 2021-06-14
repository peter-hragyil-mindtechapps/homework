type SearchText = string;
type Titles = string;
type Link = string;

export type WikipediaRes = [
    SearchText,
    Titles[],
    string[],
    Link[]
]