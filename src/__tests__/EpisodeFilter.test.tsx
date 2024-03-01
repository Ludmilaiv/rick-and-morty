import { describe, test, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react'
import EpisodeFilter from '../features/episodeFilter'
import {MockProvider, mockStore} from '../__mocks__/MockProvider'

describe("Episodes filter test", () => {

  test("Testing inTitle state management", async () => {
    render(<div id="root"></div>)
    render(<MockProvider><EpisodeFilter /></MockProvider>)
    const checkbox = screen.getByRole('in-title')
    const prevState = mockStore.getState().episodeFilter.inTitle
    await Promise.resolve()
    fireEvent.click(checkbox)
    const newState = mockStore.getState().episodeFilter.inTitle
    expect(!prevState).toEqual(newState)
  })

  test("Testing inDescription state management", async () => {
    render(<div id="root"></div>)
    render(<MockProvider><EpisodeFilter /></MockProvider>)
    const checkbox = screen.getByRole('in-description')
    const prevState = mockStore.getState().episodeFilter.inDescription
    await Promise.resolve()
    fireEvent.click(checkbox)
    const newState = mockStore.getState().episodeFilter.inDescription
    expect(!prevState).toEqual(newState)
  })

  test("Testing seasone state management", async () => {
    render(<div id="root"></div>)
    render(<MockProvider><EpisodeFilter /></MockProvider>)
    const select = screen.getByRole('season')
    const newValue = 3
    await Promise.resolve()
    fireEvent.change(select, {target: {value: newValue}})
    const newState = mockStore.getState().episodeFilter.season
    expect(newState).toEqual(newValue)
  })

  test("Testing seasone state management", async () => {
    render(<div id="root"></div>)
    render(<MockProvider><EpisodeFilter /></MockProvider>)
    const select = screen.getByRole('season')
    const newValue = 2
    await Promise.resolve()
    fireEvent.change(select, {target: {value: newValue}})
    expect(screen.getByText(`Сезон ${newValue}`)).toBeTruthy()
  })
})