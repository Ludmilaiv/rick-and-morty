import Episodes from './components/episodes'
import Header from './components/header'
import About from './components/about'
import Menu from './components/menu'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"

const router = createBrowserRouter([
  {
    path: '/',
    element: <><Menu currentHref="/"/><About /></>
  },
  {
    path: '/episodes',
    element: <><Menu currentHref="/episodes"/><Episodes /></>
  },
  {
    path: '/characters',
    element: <><Menu currentHref="/characters"/></>
  },
])

function App() {
  return (
    <div className="bg-lime-50 pb-10 min-h-screen">
      <Header />
      <RouterProvider router={router} />
    </div>
  )
}

export default App
