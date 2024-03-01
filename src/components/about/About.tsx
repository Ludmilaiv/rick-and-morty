import MainImage from '../../assets/1675663303_3-18.jpg'

function About() {
  return (
    <div className="bg-amber-50 shadow-lg rounded-lg sm:overflow-hidden overflow-x-auto mx-4 md:mx-auto md:w-2/3 min-h-96 mt-4 p-6">
      <img src={MainImage} alt="Рик и Морти" className="md:w-1/4 w-3/4 md:mr-3 mb-3 md:float-left md:inline block ml-auto mr-auto" />
      <p className="mb-2"><b>Рик и Морти</b> - американский анимационный телесериал, созданный Дэном Хармоном и Джастином Ройландом, премьера которого состоялась 2 декабря 2013 года в программном блоке Cartoon Network.</p>

      <p className="mb-2">Первый сезон шоу состоит из 11 двадцати двух минутных эпизодов. После выхода в эфир первых шести эпизодов, создатели мултфильма продлил шоу на второй сезон, состоящий из 10 двадцати двух минутных эпизодов. Далее шоу было продлено на третий сезон, состоящий из 10 двадцатидвухминутных эпизодов, которые транслировались летом 2017 года.</p>

      <p className="mb-2">Сериал был основан на серии грубо анимированных короткометражных фильмов для канала 101, основанных на пародии Back to the Future "The Real Animated Adventures of Doc and Mharti" Джастина Ройланда.</p>

    </div>
  )
}

export default About