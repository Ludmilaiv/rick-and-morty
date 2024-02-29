import type { PaginationViewProps } from "./type"
import classNames from 'classnames'

function PaginationView({
  currentPage, 
  pagesCount, 
  onChange,
  onNext,
  onPrev
}: PaginationViewProps) {
  
  
  const pages = Array(pagesCount).fill(<></>).map((_,i) => {
    return (
      <li 
        key={i}
        className={classNames({
        'block size-8 rounded border-orange-600 bg-orange-500 text-center leading-8 text-white': i === currentPage
      })}>
        {i === currentPage ? i + 1 :
          <a
            onClick={(e) => {e.preventDefault(); onChange(i)}}
            href="#"
            className="block size-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900"
          >
            {i + 1}
          </a>}
      </li>
    )
  })
  return (
    <ol className="flex justify-center gap-1 text-xs font-medium mt-4">
      {currentPage > 0 && 
          <li>
          <a 
            onClick={(e) => {e.preventDefault(); onPrev()}}
            href="#"
            className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
          >
            <span className="sr-only">Prev Page</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </li>}
      {pages}
      {currentPage < pagesCount - 1 && 
        <li>
        <a
          onClick={(e) => {e.preventDefault(); onNext()}}
          href="#"
          className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
        >
          <span className="sr-only">Next Page</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </a>
      </li>}
    </ol>
  )

}

export default PaginationView