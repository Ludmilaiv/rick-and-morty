import { connector } from '../../features/characterFilter/characterFilterSlice'
import CharactersView from './Characters'

const Characters = connector(CharactersView)

export default Characters