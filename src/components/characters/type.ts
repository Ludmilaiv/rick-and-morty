export interface Character {
  id: number,
  name: string,
  description: string,
  img: string
}

export type Characters = Character[]

export interface ResponseCharacters {
  characters: Characters, 
  count: number
}

