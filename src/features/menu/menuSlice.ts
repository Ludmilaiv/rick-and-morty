import { createSlice } from '@reduxjs/toolkit'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from '../../app/store'
import type { Menu } from './type'

const storage = localStorage.getItem('current_href')

const initialState: Menu = storage ? JSON.parse(storage) : {
  currentHref: "about"
};

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setCurrentHref: (state, action) => {
      state.currentHref = action.payload
    },
  },
})

const mapStateToProps = (state: RootState) => (state.menu)

const mapDispatchToProps = {
  setCurrentHref: (data: string) => (menuSlice.actions.setCurrentHref(data)),
}

export const connector = connect(mapStateToProps, mapDispatchToProps)

export default menuSlice.reducer

export type PropsFromRedux = ConnectedProps<typeof connector>