import type { PropsFromRedux } from "./characterPaginationSlice"
import PaginationView from "../../components/paginationView"
import { useEffect } from "react"

function CharacterPaginationView({
  currentPage,
  limit,
  setCurrent,
  next,
  prev,
  length
}: PropsFromRedux & {length: number | undefined}) {

  useEffect(() => {
    if (length && currentPage >= Math.ceil(length / limit)) {
      setCurrent(0)
    }  
  }, [length])

  useEffect(() => {
    localStorage.setItem(
      'character_pagination',
      JSON.stringify(
        { currentPage, limit }
      ))
  }, [currentPage, limit])

  const pagesCount = length ? Math.ceil(length / limit) : 0
  
  return (
    <div>
      {length ? <PaginationView 
        currentPage={currentPage} 
        pagesCount={pagesCount}
        onChange={setCurrent} 
        onNext={next}
        onPrev={prev}
      /> : ""}
    </div>
  )
}

export default CharacterPaginationView