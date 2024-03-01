import api from '../../app/api'
import EpisodeFilterView from '../../features/episodeFilter'
import type { PropsFromRedux } from "../../features/episodeFilter/episodeFilterSlice"
import { useEffect, useState } from 'react'
import { EpisodeFilter } from '../../features/episodeFilter/type'
import EpisodesPaginationView from '../../features/episodePagination'
import type { ResponseEpisodes, Episode } from './type'
import type { RootState } from '../../app/store'
import { useSelector } from 'react-redux'
import Spinner from '../spinner'
import Modal from 'react-modal'

function EpisodesView({
  text,
  inTitle,
  inDescription,
  season,
  dateStart,
  dateEnd,
}: PropsFromRedux) {

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [currentEpisode, setCurrentEpisode] = useState<Episode>()

  Modal.setAppElement('#root')

  function closeModal() {
    setIsOpenModal(false)
  }
  function openModal(episode: Episode) {
    setCurrentEpisode(episode)
    setIsOpenModal(true)
  }
  function afterOpenModal() {

  }

  const pagination = useSelector((state: RootState) => state.episodePagination)

  const filter: EpisodeFilter = {
    text,
    inTitle,
    inDescription,
    season,
    dateStart,
    dateEnd,
  }

  const { data, isLoading, error, refetch } = api.useFindEpisodesQuery({ ...filter, ...pagination }, {
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

  const episodes = data ? (data as ResponseEpisodes).episodes : []

  const modal = <Modal
    onAfterOpen={afterOpenModal}
    isOpen={isOpenModal}
    contentLabel="Modal"
    style={{
      content: {
        backgroundColor: "fffdfa",
        boxShadow: "-3px 7px 42px 0px rgba(0,0,0,0.30)"
      },
    }}
  >
    <button className="text-2xl fixed top-12 right-12 sm:top-20 sm:right-20" onClick={closeModal}><span>&#10006;</span></button>
    <div className="sm:p-5 p-3">
      <h1 className="text-xl mb-3 text-center text-orange-700">
        <span className="font-bold text-2xl text-orange-600">{currentEpisode?.title}</span>
        <br/>{currentEpisode?.eng_title}
      </h1>
      <p><span className="font-bold text-[#07074D]">Сезон {currentEpisode?.season}</span></p>
      <p><span className="font-bold text-[#07074D]">Дата выхода: </span>{currentEpisode?.date}</p>
      <p><span className="font-bold text-[#07074D]">Режиссёр: </span>{currentEpisode?.director}</p>
      <p><span className="font-bold text-[#07074D]">Автор сценария: </span>{currentEpisode?.written_by}</p>
      <h2 className="text-lg font-bold mb-2 mt-3 text-[#07074D]">Описание серии</h2>
      {currentEpisode?.description.map((paragraph, i) => <p key={`p${i}`} className="mb-2">{paragraph}</p>)}
    </div>
    
  </Modal>

  const episodesList = episodes && episodes.length ? episodes.map((episode) => (
    <tr key={episode.id} className="hover:bg-orange-100 cursor-pointer" onClick={() => openModal(episode)}>
      <td className="py-3 px-6 border-b border-gray-200">
        <span className="font-bold">{episode.title}</span>
        <br />{episode.eng_title}
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
        length={data ? (data as ResponseEpisodes).count : 0}
      />
      {modal}
    </div>
  )
}

export default EpisodesView