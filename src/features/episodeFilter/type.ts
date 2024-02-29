export interface EpisodeFilter {
    text: string,
    inTitle: boolean,
    inDescription: boolean,
    season: number | null,
    dateStart: string | null,
    dateEnd: string | null,
}