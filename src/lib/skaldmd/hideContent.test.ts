import { hideContent } from './hideContent'

describe('hideContents', () => {
  it('returns empty file, as empty', () => {
    const result = hideContent('')
    expect(result).toBe('\n')
  })
  it('returns a file with no comments, as is', () => {
    const t = 'a\nb\n'
    const result = hideContent(t)
    expect(result).toBe(t + '\n')
  })
  it('returns a file with a comment, without the comment', () => {
    const t = 'a\n// b\n'
    const result = hideContent(t)
    expect(result).toBe('a\n\n') 
  })
  it('hides a block of text, if that text starts with // restricted', () => {
    const result = hideContent('Some Hidden Stuff, below\n'+
      '// reSTRicted for members only\n'+
      'the hidden text is here')
    expect(result).toBe('Some Hidden Stuff, below\n')
  })
  it('hides a block of text, if that text starts with // restricted, and ends with // end restricted', () => {
    const result = hideContent('Some Hidden Stuff, below\n'+
      '// reSTRicted for members only\n'+
      'the hidden text is here \n' +
      '// end restricTed for now\n' +
      'and here is public again')
      expect(result).toBe('Some Hidden Stuff, below\n'+
      '\n' +
      'and here is public again\n')
  })
})