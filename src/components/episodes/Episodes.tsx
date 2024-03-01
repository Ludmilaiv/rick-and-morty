import api from '@app/api'
import EpisodeFilterView from '../../features/episodeFilter'
import type { PropsFromRedux } from "../../features/episodeFilter/episodeFilterSlice"
import { useEffect } from 'react'
import { EpisodeFilter } from '../../features/episodeFilter/type'
import EpisodesPaginationView from '../../features/episodePagination'
import type { ResponseEpisodes } from './type'
import type { RootState } from '@app/store'
import { useSelector } from 'react-redux'
import Spinner from '../spinner'

function EpisodesView({
  text,
  inTitle,
  inDescription,
  season,
  dateStart,
  dateEnd,
}: PropsFromRedux) {

  const pagination = useSelector((state: RootState) => state.episodePagination)

  const filter: EpisodeFilter = {
    text,
    inTitle,
    inDescription,
    season,
    dateStart,
    dateEnd,
  }

  const { data, isLoading, error, refetch } = api.useFindEpisodesQuery({...filter, ...pagination}, {
    refetchOnMountOrArgChange: true,
    skip: false,
  })

  useEffect(() => { refetch() }, [
    text,
    inTitle,
    inDescription,
    season,
    dateStart,
    dateEnd,
  ])

  if (isLoading) return <p>loading...</p>
  if (error) return <p>error...</p>

  const episodes = data ? (data as ResponseEpisodes).episodes : []

  const episodesList = episodes && episodes.length ? episodes.map((episode) => (
    <tr key={episode.id} className="hover:bg-orange-100">
      <td className="py-3 px-6 border-b border-gray-200">
        <span className="font-bold">{episode.title}</span>
        <br/>{episode.eng_title}
      </td>
      <td className="py-3 px-6 border-b border-gray-200">{episode.date}</td>
      <td className="py-3 px-6 border-b border-gray-200">Сезон&nbsp;{episode.season}</td>
    </tr>
  )) : <tr>
      <td colSpan={3} className="py-3 px-6 border-b border-gray-200">
        <span className="font-bold">Ничего не найдено</span>
      </td>
    </tr>

  return (
    <div>
      <EpisodeFilterView />
      <div className="bg-amber-50 shadow-lg rounded-lg sm:overflow-hidden overflow-x-auto mx-4 md:mx-auto md:w-2/3 min-h-96">
        <table className="w-full sm:table-fixed table-auto">
          <thead>
            <tr className="bg-orange-200">
              <th className="w-3/5 py-3 px-6 text-left text-gray-600 font-bold uppercase">Название</th>
              <th className="w-1/5 py-3 px-6 text-left text-gray-600 font-bold uppercase">Дата выхода</th>
              <th className="w-1/5 py-3 px-6 text-left text-gray-600 font-bold uppercase">Сезон</th>
            </tr>
          </thead>
          <tbody className="bg-orange-50">
            {isLoading ? <tr><td colSpan={3}><Spinner /></td></tr> : error ? "" : episodesList}
          </tbody>
        </table>
      </div>
      <EpisodesPaginationView 
        length={data ? (data as ResponseEpisodes).count : 0 } 
      />
    </div>
  )
}

export default EpisodesView