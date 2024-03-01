import { Provider } from 'react-redux'
import { store } from '../app/store'

export const MockProvider = ({ children = null } : { children: any }) => {
  return (
    <Provider store={store}>
      { children }
    </Provider>
  )
}

export const mockStore = store