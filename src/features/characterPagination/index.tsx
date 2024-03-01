import { connector } from './characterPaginationSlice'
import EpisodeFilterView from './CharacterPaginationView'

const CharacterPagination = connector(EpisodeFilterView)

export default CharacterPagination