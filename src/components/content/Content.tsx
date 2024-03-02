import type { PropsFromRedux } from '../../features/menu/menuSlice'
import About from '../about'
import Episodes from '../episodes'
import Characters from '../characters'

function Content({ currentHref }: PropsFromRedux) {
  return (
    <>
      { currentHref === 'about' ? <About /> : 
        currentHref === 'episodes' ? <Episodes /> :
        currentHref === 'characters' ? <Characters /> : "" }
    </>
  )
}

export default Content