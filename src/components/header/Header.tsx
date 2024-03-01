import headerImg from '../../assets/header-img.jpg'

function Header() {
  return (
    <header>
      <div
        className="relative overflow-hidden bg-cover bg-no-repeat bg-left-bottom"
        style={{
          backgroundImage: `url(${headerImg}`,
          height: "350px"
        }}

      >
        <div
          className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed"
          style={{ backgroundColor: "rgba(82, 42, 0, 0.60)" }}>
          <div className="flex h-full items-center justify-center">
            <div 
              className="px-6 text-center text-white md:px-12 text-lime-50"
              style={{
                fontFamily: "'Reggae One', system-ui",
                fontWeight: "400",
                fontStyle: "normal"
              }}
            >
              <h1 className="mb-6 text-5xl">Рик и Морти</h1>
              <h3 className="mb-8 text-3xl">вселенная</h3>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header