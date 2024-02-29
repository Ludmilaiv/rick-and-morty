export interface Episode {
  id: number,
  season: number,
  title: string,
  eng_title: string,
  director: string,
  written_by: string,
  date: string,
  description: string[],
}

export type Episodes = Episode[]

export interface ResponseEpisodes {
  episodes: Episodes, 
  count: number
}

