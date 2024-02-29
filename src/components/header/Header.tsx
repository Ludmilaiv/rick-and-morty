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
      
      <nav
        className="relative flex w-full items-center justify-between bg-white py-2 text-neutral-600 shadow-lg hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600 dark:text-neutral-200 md:flex-wrap md:justify-start"
        data-te-navbar-ref>
        <div className="flex w-full flex-wrap items-center justify-between px-3">
          <div
            className="!visible grow basis-[100%] items-center lg:!flex lg:basis-auto"
            id="navbarSupportedContentX"
            data-te-collapse-item>
            <ul
              className="mr-auto flex flex-col lg:flex-row"
              data-te-navbar-nav-ref>
              <li className="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
                <a
                  className="block transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:hover:text-white dark:focus:text-white lg:p-2 [&.active]:text-black/90"
                  href="#!"
                  data-te-nav-link-ref
                  data-te-ripple-init
                  data-te-ripple-color="light"
                >О сериале</a>
              </li>
              <li className="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
                <a
                  className="block transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:hover:text-white dark:focus:text-white lg:p-2 [&.active]:text-black/90"
                  href="#!"
                  data-te-nav-link-ref
                  data-te-ripple-init
                  data-te-ripple-color="light"
                >Эпизоды</a>
              </li>
              <li className="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
                <a
                  className="block transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:hover:text-white dark:focus:text-white lg:p-2 [&.active]:text-black/90"
                  href="#!"
                  data-te-nav-link-ref
                  data-te-ripple-init
                  data-te-ripple-color="light"
                >Персонажи</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header