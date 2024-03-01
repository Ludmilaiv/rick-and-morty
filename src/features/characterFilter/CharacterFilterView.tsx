import { useEffect, useState } from "react"
import type { PropsFromRedux } from "./characterFilterSlice"

function EpisodeFilterView({
  text,
  inName,
  inDescription,
  setText,
  inNameToggle,
  inDescriptionToggle,
}: PropsFromRedux) {

  const [textValue, setTextValue] = useState(text)
  const [inputTimeout, setInputTimeout] = useState<NodeJS.Timeout | null>(null)

  useEffect(() => {
    localStorage.setItem(
      'character_filter',
      JSON.stringify(
        { text, inName, inDescription }
      ))
  }, [text, inName, inDescription])

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
              checked={inName}
              onChange={inNameToggle}
              className="h-4 w-4"
            />
            <label htmlFor="in-title" className="ml-2 text-base font-medium text-[#07074D]">Искать в имени</label>
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
        </div>
      </div>
    </div>
  )
}

export default EpisodeFilterView