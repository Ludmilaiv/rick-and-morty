export type PaginationViewProps = {
  currentPage: number,
  pagesCount: number,
  onChange: (i: number) => void
  onNext: () => void
  onPrev: () => void
}