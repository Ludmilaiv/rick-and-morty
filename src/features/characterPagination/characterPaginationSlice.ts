import { createSlice } from '@reduxjs/toolkit'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from '../../app/store'
import type { CharacterPagination } from './type'

const storage = localStorage.getItem('character_pagination')

const initialState: CharacterPagination = storage ? JSON.parse(storage) : {
  currentPage: 0,
  limit: 5
};

export const characterPaginationSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {
    setCurrent: (state, action) => {
      state.currentPage = action.payload
    },
    next: (state) => {
      state.currentPage += 1
    },
    prev: (state) => {
      state.currentPage -= 1
    },
  },
})

const mapStateToProps = (state: RootState) => (state.characterPagination)

const mapDispatchToProps = {
  setCurrent: (data: number) => (characterPaginationSlice.actions.setCurrent(data)),
  next: () => (characterPaginationSlice.actions.next()),
  prev: () => (characterPaginationSlice.actions.prev()),
}

export const connector = connect(mapStateToProps, mapDispatchToProps)

export default characterPaginationSlice.reducer

export type PropsFromRedux = ConnectedProps<typeof connector>