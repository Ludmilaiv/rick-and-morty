import { describe, test, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react'
import CharacterFilter from '../features/characterFilter'
import {MockProvider, mockStore} from '../__mocks__/MockProvider'

describe("Characters filter test", () => {

  test("Testing inName state management", async () => {
    render(<div id="root"></div>)
    render(<MockProvider><CharacterFilter /></MockProvider>)
    const checkbox = screen.getByRole('in-name')
    const prevState = mockStore.getState().characterFilter.inName
    await Promise.resolve()
    fireEvent.click(checkbox)
    const newState = mockStore.getState().characterFilter.inName
    expect(!prevState).toEqual(newState)
  })

  test("Testing inDescription state management", async () => {
    render(<div id="root"></div>)
    render(<MockProvider><CharacterFilter /></MockProvider>)
    const checkbox = screen.getByRole('in-description')
    const prevState = mockStore.getState().characterFilter.inDescription
    await Promise.resolve()
    fireEvent.click(checkbox)
    const newState = mockStore.getState().characterFilter.inDescription
    expect(!prevState).toEqual(newState)
  })
})