import Skaldmd from '@/lib/skaldmd.js'

describe('Render', () => {
  let renderer

  beforeEach(() => {
    renderer = new Skaldmd()
  })

  it('renders empty file, as empty', () => {
    const result = renderer.toHtml('')
    expect(result).toBe('')
  })

  it('renders sinle line as a paragraph', () => {
    const result = renderer.toHtml('test paragraph')
    expect(result).toBe('<p>test paragraph</p>\n')
  })

  it('renders a paragraph with br', () => {
    const result = renderer.toHtml('test\nparagraph')
    expect(result).toBe('<p>test<br/>\nparagraph</p>\n')
  })

  it('renders two paragraphs', () => {
    const result = renderer.toHtml('test 1\n    \nparagraph 2')
    expect(result).toBe('<p>test 1</p>\n<p>paragraph 2</p>\n')
  })

  it('renders a h3', () => {
    const result = renderer.toHtml('### Something')
    expect(result).toBe('<h3>Something</h3>\n')
  })

  it('renders a h2 and a paragraph', () => {
    const result = renderer.toHtml('## Something\nwith text')
    expect(result).toBe('<h2>Something</h2>\n<p>with text</p>\n')
  })

  it('renders a p, h1 and a paragraph', () => {
    const result = renderer.toHtml('line\n## Something\nwith text')
    expect(result).toBe('<p>line</p>\n<h2>Something</h2>\n<p>with text</p>\n')
  })

  it('renders a p, and a two by two array', () => {
    const result = renderer.toHtml('line\n|\n|cell | another|\n|| fourth |')
    expect(result).toBe('<p>line</p>\n<table>\n' +
      '<tr><td>cell</td><td class="alignRight">another</td></tr>\n' +
      '<tr><td></td><td class="alignCenter">fourth</td></tr>\n' +
      '</table>\n')
  })

  it('renders a [wiki:page] link to skald/page, when there is no wiki set', () => {
    const result = renderer.toHtml('[wiki:page]')
    expect(result).toBe('<p><a href="/#/v/skald/page">page</a></p>\n')
  })

  it('renders a [wiki:test/page] link to test/page, when there is no wiki set', () => {
    const result = renderer.toHtml('it links to [wiki:test/page]')
    expect(result).toBe('<p>it links to <a href="/#/v/test/page">test/page</a></p>\n')
  })
})
