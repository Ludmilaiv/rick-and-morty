import type { PropsFromRedux } from "./episodePaginationSlice"
import PaginationView from "../../components/paginationView"
import { useEffect } from "react"

function EpisodePaginationView({
  currentPage,
  limit,
  setCurrent,
  next,
  prev,
  length
}: PropsFromRedux & {length: number | undefined}) {

  useEffect(() => {
    setCurrent(0)
  }, [length])

  const pagesCount = length ? Math.ceil(length / limit) : 0
  
  return (
    <div>
      <PaginationView 
        currentPage={currentPage} 
        pagesCount={pagesCount}
        onChange={setCurrent} 
        onNext={next}
        onPrev={prev}
      />
    </div>
  )
}

export default EpisodePaginationView