import Skaldmd from './index'

const siteid = 'test-site'

describe('render wikitext', () => {
  let renderer:Skaldmd

  beforeEach(() => {
    renderer = new Skaldmd(siteid)
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
    expect(result).toBe('<p><a href="/#/v/' + siteid + '/page">page</a></p>\n')
  })

  it('renders a [wiki:4.0 review] link to skald/4-0-review, when there is no wiki set', () => {
    const result = renderer.toHtml('[wiki:4.0 review]')
    expect(result).toBe('<p><a href="/#/v/' + siteid + '/4-0-review">4.0 review</a></p>\n')
  })

  it('renders a [wiki:kääpiö] link to skald/kääpiö, when there is no wiki set', () => {
    const result = renderer.toHtml('[wiki:kääpiö]')
    expect(result).toBe('<p><a href="/#/v/' + siteid + '/kääpiö">kääpiö</a></p>\n')
  })

  it('renders a [wiki:test/page] link to test/page', () => {
    const result = renderer.toHtml('it links to [wiki:test/page ]')
    expect(result).toBe('<p>it links to <a href="/#/v/test/page">test/page</a></p>\n')
  })

  it('renders a [wiki:test/page Named] link to test/page-named with text Named', () => {
    const result = renderer.toHtml('it links to [wiki:test/page | Named]')
    expect(result).toBe('<p>it links to <a href="/#/v/test/page">Named</a></p>\n')
  })

  it('renders a [url:http://mekanismi.web.app] link to http://mekanismi.web.app', () => {
    const result = renderer.toHtml('it links to [url:http://mekanismi.web.app]')
    expect(result).toBe('<p>it links to <a href="http://mekanismi.web.app">http://mekanismi.web.app</a></p>\n')
  })

  it('renders a [url:http://mekanismi.web.app|link] link to http://mekanismi.web.app', () => {
    const result = renderer.toHtml('it links to [url:http://mekanismi.web.app|link]')
    expect(result).toBe('<p>it links to <a href="http://mekanismi.web.app">link</a></p>\n')
  })
  it('renders a *[url:http://mekanismi.web.app|link]* link to *http://mekanismi.web.app*', () => {
    const result = renderer.toHtml('it links *to [url:http://mekanismi.web.app|link]*')
    expect(result).toBe('<p>it links <b>to <a href="http://mekanismi.web.app">link</a></b></p>\n')
  })
  it('renders a _[url:http://mekanismi.web.app|link]_ link to _http://mekanismi.web.app_', () => {
    const result = renderer.toHtml('it links _to [url:http://mekanismi.web.app|link]_')
    expect(result).toBe('<p>it links <i>to <a href="http://mekanismi.web.app">link</a></i> </p>\n')
  })

  it('renders a HR', () => {
    const result = renderer.toHtml('a\n\n----\ngg')
    expect(result).toBe('<p>a</p>\n' +
     '<hr/>\n' +
     '<p>gg</p>\n')
  })

  it('renders a li', () => {
    const result = renderer.toHtml('- a li, with\n' +
      '- another li')
    expect(result).toBe('<ul>\n' +
      '<li>a li, with</li>\n' +
      '<li>another li</li>\n' +
      '</ul>\n')
  })

  it('renders a nested li with 2 levels', () => {
    const result = renderer.toHtml('- a li, with\n' +
      '- another li\n' +
      '-- subli\n' +
      '-- subli\n' +
      '- another li\n')
    expect(result).toBe('<ul>\n' +
      '<li>a li, with</li>\n' +
      '<li>another li</li>\n' +
      '<ul>\n' +
      '<li>subli</li>\n' +
      '<li>subli</li>\n' +
      '</ul>\n' +
      '<li>another li</li>\n' +
      '</ul>\n')
  })

  it('renders a nested li', () => {
    const result = renderer.toHtml('-- a li\n')
    expect(result).toBe('<ul>\n' +
      '<ul>\n' +
      '<li>a li</li>\n' +
      '</ul>\n' +
      '</ul>\n')
  })

  it('renders a legend box', () => {
    const result = renderer.toHtml('[legend] \n' +
     'some text\n' +
     '[/legend]')
    expect(result).toBe('<div class="legend">\n' +
      '<p>some text</p>\n' +
      '</div>')
  })

  it('renders a code block', () => {
    const result = renderer.toHtml('``` \n' +
     'some text\n' +
     '```')
    expect(result).toBe('<div class="code">\n' +
      'some text<br/>\n' +
      '</div>')
  })

  it('renders italics', () => {
    const result = renderer.toHtml('_Lawful Evil, level 13 Wayfinder Fighter_ testTest')
    expect(result).toBe('<p> <i>Lawful Evil, level 13 Wayfinder Fighter</i> testTest</p>\n')
  })

  it('renders italics with " and , ', () => {
    // *Palvelu on beta-vaiheen kehityksessä. Se toimii "täysin",*
    expect(true).toBe(false)
  })

  it('hides comments', () => {
    const result = renderer.toHtml('Comment below\n' +
    '// And some commentary')
    expect(result).toBe('<p>Comment below</p>\n')
  })

  it('hides restricted', () => {
    const result = renderer.toHtml('Hidden text Follows\n' +
      '// rEstricteD\n' +
      'This should be Hidden\n' +
      '// End rEsTricted  \n' +
      'And ends before this line\n')
    expect(result).toBe('<p>Hidden text Follows</p>\n' +
      '<p>And ends before this line</p>\n')
  })

  it('shows restricted, when user has tags', () => {
    const userTags = ['cat', 'dog']
    const result = renderer.toHtml('Hidden text Follows\n' +
      '// Restricted\n' +
      '// Allow: cat, dog\n' +
      'This should not be Hidden\n' +
      '// End resTricted  \n' +
      '\n' +
      'And ends before this line\n',
    userTags)
    expect(result).toBe('<p>Hidden text Follows</p>\n' +
      '<p>This should not be Hidden</p>\n' +
      '<p>And ends before this line</p>\n')
  })
})
