import { connector } from './episodePaginationSlice'
import EpisodeFilterView from './EpisodePaginationView'

const EpisodePagination = connector(EpisodeFilterView)

export default EpisodePagination