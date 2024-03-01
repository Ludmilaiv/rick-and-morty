import { createSlice } from '@reduxjs/toolkit'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from '@app/store'
import type { CharacterFilter } from './type'

const storage = localStorage.getItem('character_filter')

const initialState: CharacterFilter = storage ? 
  JSON.parse(storage) : 
  {
    text: '',
    inName: true,
    inDescription: false,
  }

export const characterFilterSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    setText: (state, action) => {
      state.text = action.payload
    },
    inNameToggle: (state) => {
      state.inName = !state.inName
    },
    inDescriptionToggle: (state) => {
      state.inDescription = !state.inDescription
    }
  },
})

const mapStateToProps = (state: RootState) => (state.characterFilter)

const mapDispatchToProps = {
  setText: (data: string) => (characterFilterSlice.actions.setText(data)),
  inNameToggle: () => (characterFilterSlice.actions.inNameToggle()),
  inDescriptionToggle: () => (characterFilterSlice.actions.inDescriptionToggle()),
}

export const connector = connect(mapStateToProps, mapDispatchToProps)

export default characterFilterSlice.reducer

export type PropsFromRedux = ConnectedProps<typeof connector>