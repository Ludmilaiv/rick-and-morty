import { createSlice } from '@reduxjs/toolkit'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from '@app/store'
import type { EpisodePagination } from './type'

const initialState: EpisodePagination = {
  currentPage: 0,
  limit: 5
};

export const episodePaginationSlice = createSlice({
  name: 'episodes',
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

const mapStateToProps = (state: RootState) => (state.episodePagination)

const mapDispatchToProps = {
  setCurrent: (data: number) => (episodePaginationSlice.actions.setCurrent(data)),
  next: () => (episodePaginationSlice.actions.next()),
  prev: () => (episodePaginationSlice.actions.prev()),
}

export const connector = connect(mapStateToProps, mapDispatchToProps)

export default episodePaginationSlice.reducer

export const setCurrent = (data: number) => 
  (episodePaginationSlice.actions.setCurrent(data))

export type PropsFromRedux = ConnectedProps<typeof connector>