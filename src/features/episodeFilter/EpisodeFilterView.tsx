import { useEffect, useState } from "react"
import type { PropsFromRedux } from "./episodeFilterSlice"

function EpisodeFilterView({
  text,
  inTitle,
  inDescription,
  season,
  dateStart,
  dateEnd,
  setText,
  inTitleToggle,
  inDescriptionToggle,
  setSeasone,
  setStartDate,
  setEndDate,
}: PropsFromRedux) {

  const [textValue, setTextValue] = useState(text)
  const [inputTimeout, setInputTimeout] = useState<NodeJS.Timeout | null>(null)

  useEffect(() => {
    localStorage.setItem(
      'episode_filter',
      JSON.stringify(
        { text, inTitle, inDescription, season, dateStart, dateEnd }
      ))
  }, [text, inTitle, inDescription, season, dateStart, dateEnd])

  const inputText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextValue(e.target.value)
    if (inputTimeout) clearTimeout(inputTimeout)
    setInputTimeout(setTimeout(() => setText(e.target.value), 1000))
  }

  return (
    <div className="bg-amber-50 shadow-lg rounded-lg sm:overflow-hidden overflow-x-auto mx-4 md:mx-auto min-h-40 mb-5 pt-5 pb-5">
      <div className="mx-4 md:mx-auto md:w-2/3 flex flex-wrap md:flex-nowrap justify-between">
        <div className="md:basis-1/2 basis-full md:mr-3">
          <input type="text"
            value={textValue}
            placeholder="Поиск по словам"
            onChange={inputText}
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />

          <div className="mt-2">
            <input
              type="checkbox"
              id="in-title"
              checked={inTitle}
              onChange={inTitleToggle}
              className="h-4 w-4"
            />
            <label htmlFor="in-title" className="ml-2 text-base font-medium text-[#07074D]">Искать в названии</label>
          </div>

          <div className="mt-2">
            <input
              type="checkbox"
              id="in-desk"
              checked={inDescription}
              onChange={inDescriptionToggle}
              className="h-4 w-4"
            />
            <label className="ml-2 text-base font-medium text-[#07074D]" htmlFor="in-desk">Искать в описании</label>
          </div>
        </div>

        <div className="md:basis-1/2 basis-full md:ml-3">
          <div className="flex items-center">
            <label htmlFor="start-date" className="mr-2 text-base font-medium text-[#07074D]">от </label>
            <input type="date" id="start-date"
              value={dateStart || ""}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-1.5 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>

          <div className="flex mt-2 items-center">
            <label htmlFor="end-date" className="mr-2 text-base font-medium text-[#07074D]">до </label>
            <input type="date" id="end-date"
              value={dateEnd || ""}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-1.5 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>

          <select
            value={season || 0}
            onChange={(e) => setSeasone(+e.target.value)}
            className="w-full mt-2 rounded-md border border-[#e0e0e0] bg-white py-2 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          >
            <option value={0}>Все сезоны</option>
            {Array(10).fill(0).map((_, i) =>
              <option key={i} value={i + 1}>Сезон {i + 1}</option>)}
          </select>
        </div>
      </div>
    </div>
  )
}

export default EpisodeFilterView