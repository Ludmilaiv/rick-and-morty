import { createSlice } from '@reduxjs/toolkit'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from '../../app/store'
import type { EpisodeFilter } from './type'

const storage = localStorage.getItem('episode_filter')

const initialState: EpisodeFilter = storage ? 
  JSON.parse(storage) : 
  {
    text: '',
    inTitle: true,
    inDescription: false,
    season: null,
    dateStart: null,
    dateEnd: null,
  }

export const episodeFilterSlice = createSlice({
  name: 'episodes',
  initialState,
  reducers: {
    setText: (state, action) => {
      state.text = action.payload
    },
    inTitleToggle: (state) => {
      state.inTitle = !state.inTitle
    },
    inDescriptionToggle: (state) => {
      state.inDescription = !state.inDescription
    },
    setSeasone: (state, action) => {
      const seasone = action.payload ? Number(action.payload) : null
      state.season = seasone
    },
    setStartDate: (state, action) => {
      const date = action.payload ? action.payload.split('.').reverse().join('-') : null
      state.dateStart = date
    },
    setEndDate: (state, action) => {
      const date = action.payload ? action.payload.split('.').reverse().join('-') : null
      state.dateEnd = date
    }
  },
})

const mapStateToProps = (state: RootState) => (state.episodeFilter)

const mapDispatchToProps = {
  setText: (data: string) => (episodeFilterSlice.actions.setText(data)),
  inTitleToggle: () => (episodeFilterSlice.actions.inTitleToggle()),
  inDescriptionToggle: () => (episodeFilterSlice.actions.inDescriptionToggle()),
  setSeasone: (data: number) => (episodeFilterSlice.actions.setSeasone(data)),
  setStartDate: (data: string) => (episodeFilterSlice.actions.setStartDate(data)),
  setEndDate: (data: string) => (episodeFilterSlice.actions.setEndDate(data)),
}

export const connector = connect(mapStateToProps, mapDispatchToProps)

export default episodeFilterSlice.reducer

export type PropsFromRedux = ConnectedProps<typeof connector>