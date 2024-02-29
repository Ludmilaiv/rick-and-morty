import { connector } from './episodePaginationSlice'
import EpisodeFilterView from './EpisodePaginationView'

const EpisodeFilter = connector(EpisodeFilterView)

export default EpisodeFilter