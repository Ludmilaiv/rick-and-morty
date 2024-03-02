import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Episodes } from '../components/episodes/type'
import type { EpisodeFilter } from '../features/episodeFilter/type'
import Search from 'flexsearch'
import type { EpisodePagination } from '../features/episodePagination/type'
import type { Characters } from '../components/characters/type'
import type { CharacterFilter } from '../features/characterFilter/type'
import type { CharacterPagination } from '../features/characterPagination/type'

const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
  }),
  tagTypes: ['Episodes'],
  endpoints: (build) => ({
    findEpisodes:
      build.query<Episodes | { episodes: Episodes, count: number }, EpisodeFilter & EpisodePagination>({
        query: (_) => ({ url: '/db.json' }),
        transformResponse: (
          response: { episodes: Episodes }, _, arg
        ) => {
          // При переходе на REST фильтрацию в transformResponse следует убрать
          const {
            text,
            inTitle,
            inDescription,
            dateStart,
            dateEnd,
            season,
            currentPage,
            limit
          } = arg
          const episodes = response.episodes.filter((episode) => {
            const index = new Search.Index();
            const episodeDate = new Date(episode.date.split('.').reverse().join('-'))
            const start = dateStart ? new Date(dateStart) : null
            const end = dateEnd ? new Date(dateEnd) : null
            if (inTitle) index.add(1, episode.title + ' ' + episode.eng_title)
            if (inDescription) index.add(2, episode.description.join('\n'))
            const forText = !text || (!inTitle && !inDescription) || index.search(text).length
            const forSasone = !season || episode.season === season
            const forDateStart = !start || episodeDate >= start
            const forDateEnd = !end || episodeDate <= end
            return forSasone && forDateStart && forDateEnd && forText
          })
          const start = currentPage * limit
          return {
            episodes: episodes.slice(start, start + limit),
            count: episodes.length,
          }
        },
        transformErrorResponse: (
          response: { status: string | number },
        ) => response.status,
      }),
    findCharacters:
      build.query<Characters | { characters: Characters, count: number }, CharacterFilter & CharacterPagination>({
        query: (_) => ({ url: '/db.json' }),
        transformResponse: (
          response: { characters: Characters }, _, arg
        ) => {
          // При переходе на REST фильтрацию в transformResponse следует убрать
          const {
            text,
            inName,
            inDescription,
            currentPage,
            limit
          } = arg
          const characters = response.characters.filter((character) => {
            const index = new Search.Index();
            if (inName) index.add(1, character.name)
            if (inDescription) index.add(2, character.description)
            const forText = !text || (!inName && !inDescription) || index.search(text).length
            return forText
          })
          const start = currentPage * limit
          return {
            characters: characters.slice(start, start + limit),
            count: characters.length,
          }
        },
        transformErrorResponse: (
          response: { status: string | number },
        ) => response.status,
      }),
  }),
})

export default api
