import api from '@app/api'
import EpisodeFilterView from '../../features/characterFilter'
import type { PropsFromRedux } from "../../features/characterFilter/characterFilterSlice"
import { useEffect, useState } from 'react'
import { CharacterFilter } from '../../features/characterFilter/type'
import CharactersPaginationView from '../../features/characterPagination'
import type { ResponseCharacters, Character } from './type'
import type { RootState } from '@app/store'
import { useSelector } from 'react-redux'
import Spinner from '../spinner'
import Modal from 'react-modal'

function CharactersView({
  text,
  inName,
  inDescription,
}: PropsFromRedux) {

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [currentCharacter, setCurrentEpisode] = useState<Character>()

  Modal.setAppElement('#root')

  function closeModal() {
    setIsOpenModal(false)
  }
  function openModal(episode: Character) {
    setCurrentEpisode(episode)
    setIsOpenModal(true)
  }
  function afterOpenModal() {

  }

  const pagination = useSelector((state: RootState) => state.characterPagination)

  const filter: CharacterFilter = {
    text,
    inName,
    inDescription,
  }

  const { data, isLoading, error, refetch } = api.useFindCharactersQuery({ ...filter, ...pagination }, {
    refetchOnMountOrArgChange: true,
    skip: false,
  })

  useEffect(() => { refetch() }, [
    text,
    inName,
    inDescription,
  ])

  const characters = data ? (data as ResponseCharacters).characters : []

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
        <span className="font-bold text-2xl text-orange-600">{currentCharacter?.name}</span>
      </h1>
      <img src={`characters/${currentCharacter?.img}`} alt={currentCharacter?.name} className="md:w-1/4 w-3/4 md:mr-3 mb-3 md:float-left md:inline block ml-auto mr-auto" />
      <p className="mb-2">{currentCharacter?.description}</p>
    </div>
    
  </Modal>

  const charactersList = characters && characters.length ? characters.map((character) => (
    <tr key={character.id} className="hover:bg-orange-100 cursor-pointer" onClick={() => openModal(character)}>
      <td className="py-3 px-6 border-b border-gray-200">
        <span className="font-bold">{character.name}</span>
      </td>
      <td className="py-3 px-6 border-b border-gray-200">
        <img src={`characters/${character?.img}`} alt={character.name} className="h-20" />
      </td>
    </tr>
  )) : <tr>
    <td colSpan={2} className="py-3 px-6 border-b border-gray-200">
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
              <th className="w-3/5 py-3 px-6 text-left text-gray-600 font-bold uppercase">Имя персонажа</th>
              <th className="w-1/5 py-3 px-6 text-left text-gray-600 font-bold uppercase">Фото</th>
            </tr>
          </thead>
          <tbody className="bg-orange-50">
            {isLoading ? <tr><td colSpan={3}><Spinner /></td></tr> : error ? "" : charactersList}
          </tbody>
        </table>
      </div>
      <CharactersPaginationView
        length={data ? (data as ResponseCharacters).count : 0}
      />
      {modal}
    </div>
  )
}

export default CharactersView