import { connector } from '../../features/episodeFilter/episodeFilterSlice'
import EpisodesView from './Episodes'

const Episodes = connector(EpisodesView)

export default Episodes