import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Episodes } from '../components/episodes/type'
import type { EpisodeFilter } from 'src/features/episodeFilter/type'
import Search from 'flexsearch'
import moment from 'moment'
import { EpisodePagination } from 'src/features/episodePagination/type'

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
            if (inTitle) index.add(1, episode.title + ' ' + episode.eng_title)
            if (inDescription) index.add(2, episode.description.join('\n'))
            const forText = !text || (!inTitle && !inDescription) || index.search(text).length
            const forSasone = !season || episode.season === season
            const forDateStart = !dateStart || 
              moment(episode.date).isAfter(dateStart) || 
              moment(episode.date).isSame(dateStart)
            const forDateEnd = !dateEnd || 
              moment(episode.date).isBefore(dateEnd) ||
              moment(episode.date).isSame(dateEnd)
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
  }),
})

export default api
