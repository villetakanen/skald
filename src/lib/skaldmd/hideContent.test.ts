import { hideContent } from './hideContent'

describe('hideContents', () => {
  it('renders empty file, as empty', () => {
    const result = hideContent('')
    expect(result).toBe('')
  })
})