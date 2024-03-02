import classNames from 'classnames'
import type { PropsFromRedux } from "./menuSlice"
import { useEffect } from 'react'

const menuItems = [
  { key: "m-1", caption: "О мультсериале", href: "about" },
  { key: "m-2", caption: "Эпизоды", href: "episodes" },
  { key: "m-3", caption: "Персонажи", href: "characters" },
]

function Menu({ currentHref, setCurrentHref }: PropsFromRedux) {
  useEffect(() => {
    localStorage.setItem(
      'current_href',
      JSON.stringify(
        { currentHref }
      ))
  }, [currentHref])

  return (
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
            {menuItems.map((item) => <li key={item.key} className="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
              <a
                onClick={(e) => {e.preventDefault(); setCurrentHref(item.href)}}
                className={classNames({
                  "block transition duration-150 ease-in-out focus:text-neutral-700 disabled:text-black/30 lg:p-2 [&.active]:text-black/90": true,
                  "hover:text-neutral-800": item.href !== currentHref,
                  "font-bold text-[#07074D] cursor-default": item.href === currentHref
                })}
                href={item.href}
                data-te-nav-link-ref
                data-te-ripple-init
                data-te-ripple-color="light"
              >{item.caption}</a>
            </li>)}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Menu