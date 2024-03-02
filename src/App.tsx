import Header from './components/header'
import Menu from './features/menu'
import Content from './components/content'

function App() {

  return (
    <div className="bg-lime-50 pb-10 min-h-screen">
      <Header />
      <Menu />
      <Content />
    </div>
  )
}

export default App
