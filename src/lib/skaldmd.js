const NEWLINE = '\n'

const NONE = -1
const PARAGRAPH = 0
const TABLE = 1
const UL = 2

export default class Skaldmd {
  constructor (siteid) {
    this.siteLinkStub = siteid
    this.parsing = NONE
    this.rendedHtml = ''
  }
  /**
   * Sets current stream parsing mode to mode
   * @param {*} mode NONE, PARAGRAPH, TABLE, UL
   */
  setMode (mode) {
    this.resetMode()
    this.parsing = mode
  }
  toHtml (rawContent) {
    if (!rawContent) return ''

    this.rendedHtml = ''

    let linesArray = rawContent.split(NEWLINE)

    linesArray.forEach((line) => {
      console.log('line', line.substring(0, 3), line.trim().length)

      // if the line is emtpy, we always just reset the parsing mode
      if (line.trim().length === 0) this.resetMode()
      // #... A header
      else if (line[0] === '#') this.parseH(line)
      // -... A bullet point
      else if (line[0] === '-') this.parseUL(line)
      // a table starts
      else if (line[0] === '|') this.parseTable(line)
      // In a mode, continuing
      // else if (parsing === PARAGRAPH) this.parseP(line)
      // else if (parsing === TABLE) this.parseTR(line)
      else this.parseP(line)
    })
    this.resetMode()
    return this.rendedHtml
  }
  resetMode () {
    if (this.parsing > -1) {
      if (this.parsing === PARAGRAPH) this.rendedHtml += '</p>\n'
      if (this.parsing === UL) this.rendedHtml += '</ul>\n'
      if (this.parsing === TABLE) this.rendedHtml += '</table>\n'
      this.parsing = NONE
    }
  }
  parseText (line) {
    // Italics
    const re = new RegExp('(^_| _)(\\w+[\\w ]*)(_ |_$)', 'gm')
    line = line.replace(re, function (match, p1, p2, p3, offset, string) {
      return '<i>' + p2 + '</i>'
    })
    line = this.rendWikiLinks(line)
    this.rendedHtml += line
  }
  /**
   * Sets mode to UL (no nesting of ul, and table, or ul), and rends the line item
   * @param {string} line the ul
   */
  parseUL (line) {
    /* / console.log('parseUL', line)
    if (parsing !== UL) {
      this.resetMode()
      parsing = UL
      rendedHtml += '<ul>'
    }
    rendedHtml += '<li>'
    this.parseText(line.substring(1))
    rendedHtml += '</li>' */
  }
  parseH (line) {
    this.resetMode()
    let level = 1
    if (line.indexOf('##') === 0) level = 2
    if (line.indexOf('###') === 0) level = 3
    if (line.indexOf('####') === 0) level = 4
    this.rendedHtml += '<h' + level + '>'
    this.parseText(line.substring(level).trim())
    this.rendedHtml += '</h' + level + '>\n'
  }
  /**
   * A <p> is found on the stream
   * @param {*} line the linedata
   */
  parseP (line) {
    if (this.parsing !== PARAGRAPH) {
      console.log('parseP starts paragraph')
      this.setMode(PARAGRAPH)
      this.rendedHtml += '<p>'
    } else {
      this.rendedHtml += '<br/>\n'
    }
    this.parseText(line)
  }
  parseTable (line) {
    // We are starting to parse a Table, add the table tag
    if (this.parsing !== TABLE) {
      this.setMode(TABLE)
      // No style set
      this.rendedHtml += '<table>\n'
      // let cssClass = ''
      // if (line.includes('border=1')) cssClass += ' border'
      // rendedHtml += '<table class=' + cssClass + '>'
      return
    }

    this.rendedHtml += '<tr>'
    this.parseTableRow(line)
    this.rendedHtml += '</tr>\n'

    /* Parsing a single row
    let tr = '<tr>'
    const cells = line.split('|')
    cells.forEach((cell) => {
      if (cell.length > 0) {
        let styleClass = ''
        let cellType = 'td'
        if (cell[0] === '!') {
          cell = cell.substring(1)
          cellType = 'th'
        }
        if (cell[cell.length - 1] === ' ') {
          if (cell[0] === ' ') styleClass = 'align-center'
          else styleClass = 'align-left'
        } else if (cell[0] === ' ') styleClass = 'align-right'
        else styleClass = 'align-left'
        tr += '<' + cellType + ' class="' + styleClass + '">' + this.parseText(cell) + '</' + cellType + ' >'
      }
    })
    rendedHtml += tr + '</tr>' */
  }
  /**
   * Should only be called from parseTable
   * @param {*} line line, inside table mode
   */
  parseTableRow (line) {
    // remobe pipe at the end, if any!
    if (line[line.length - 1] === '|') line = line.substring(0, line.length - 1)
    // remove pipe at the beginning
    const lineArray = line.substring(1).split('|')
    lineArray.forEach((cell) => {
      let cssClass = ' class="alignLeft"'
      if (cell[0] === ' ') {
        if (cell[cell.length - 1] === ' ') cssClass = ' class="alignCenter"'
        else cssClass = ' class="alignRight"'
      }
      this.rendedHtml += `<td${cssClass}>`
      this.parseText(cell.trim())
      this.rendedHtml += '</td>'
    })
  }

  rendWikiLinks (line) {
    /* console.log('rendWikiLinks', siteLinkStub, line)
    const re = new RegExp('([\\[(]wiki:)(.+?)([\\])])', 'gm')
    line = line.replace(re, (match, p1, p2, p3, offset, string) => {
      p2 = p2.trim()
      const link = p2.includes(' ') ? p2.substring(p2.indexOf(' ')) : p2
      let url = p2.split(' ')[0]
      url = url.includes('/') ? `#/v/${url}` : `#/v/${siteLinkStub}/${url}`
      return `<a href="${url}">${link}</a>`// '<a hred' + p2 + '-'
    })
    return line */
    return line
  }

  /* console.log(inArrayBool)
      // h1...h4
      if (line.substring(0, 2) === '# ') rendedHtml += '<h1>' + this.rendLine(line.substring(2)) + '</h1>\n'
      else if (line.substring(0, 3) === '## ') rendedHtml += '<h2>' + this.rendLine(line.substring(3)) + '</h2>\n'
      else if (line.substring(0, 4) === '### ') rendedHtml += '<h3>' + this.rendLine(line.substring(4)) + '</h3>\n'
      else if (line.substring(0, 5) === '#### ') rendedHtml += '<h4>' + this.rendLine(line.substring(5)) + '</h4>\n'

      // Here stars an Array!
      else if (!inArray && line.indexOf('|') === 0) {
        console.log('start of array')
        rendedHtml += '<table>'
        inArray = true
        inArrayBool = true
      } else if (inArray && line.indexOf('|') === 0) {
        console.log('inArray', line)
        rendedHtml += this.rendTableLine(line)
      } else if (inArray) {
        rendedHtml += '<tr><td>' + this.rendLine(line) + '</td></tr></table>'
        inArray = false
        console.log('endOfArray', line)
        inArrayBool = false
      } else rendedHtml += this.rendLine(line) + '<br/>\n' * /
    })
    // console.log('raw, ', rawContent, 'rended,', rendedHtml)
    return rendedHtml
  } */
  /* rendHeaderLine (line) {
    rendedHtml = ''
    if (line.substring(0, 2) === '# ') rendedHtml += '<h1>' + this.rendLine(line.substring(2)) + '</h1>\n'
    else if (line.substring(0, 3) === '## ') rendedHtml += '<h2>' + this.rendLine(line.substring(3)) + '</h2>\n'
    else if (line.substring(0, 4) === '### ') rendedHtml += '<h3>' + this.rendLine(line.substring(4)) + '</h3>\n'
    else if (line.substring(0, 5) === '#### ') rendedHtml += '<h4>' + this.rendLine(line.substring(5)) + '</h4>\n'
    return rendedHtml
  } */

  /* rendTableLine (line) {
    console.log('rend-tabe', inArrayBool)
    let tr = '<tr>'
    const cells = line.split('|')
    cells.forEach((cell) => {
      if (cell.length > 0) {
        let styleClass = ''
        let cellType = 'td'
        if (cell[0] === '!') {
          cell = cell.substring(1)
          cellType = 'th'
        }
        if (cell[cell.length - 1] === ' ') {
          if (cell[0] === ' ') styleClass = 'align-center'
          else styleClass = 'align-left'
        } else if (cell[0] === ' ') styleClass = 'align-right'
        else styleClass = 'align-left'
        tr += '<' + cellType + ' class="' + styleClass + '">' + this.rendLine(cell) + '</' + cellType + ' >'
      }
    })
    return tr + '</tr>'
  }

  rendLine (line) {
    console.log('rendline', inArrayBool)
    // _italic_
    const re = new RegExp('(^_| _)(\\w+[\\w ]*)(_ |_$)', 'gm')
    line = line.replace(re, function (match, p1, p2, p3, offset, string) {
      return '<i>' + p2 + '</i>'
    })
    // line = this.wikiLinks(page, siteid)
    // *bold*
    return line
  }
  /*
  function wikiLinks (page, siteid) {
    const re = new RegExp('([\\[(]wiki:)(.+?)([\\])])', 'g')
    return page.replace(re, function (match, p1, p2, p3, offset, string) {
      p2 = p2.trim()
      // First we ned to separate written and linked part
      var link = p2
      // If link contains a site id, we use it, if not, we use the parameter siteid
      if (link.includes('/')) {
        const parts = link.split('/')
        return `[${p2}](/#/v/${toURI(parts[0])}/${toURI(parts[1])})`
      } else {
        return `[${p2}](/#/v/${siteid}/${toURI(link)})`
      }
    })
  }
  /* streamRend (remainingContent, parsed, ends) {
    console.log('parsing: ', remainingContent.substring(5), parsed, ends)
    // This is the last line, return the whole set, after parsing the line
    if (!remainingContent.includes(NEWLINE)) {
      return parsed + this.parseLine(remainingContent)[0] + ends
    }

    let currentBuffer = this.parseLine(
      remainingContent.substring(0, remainingContent.indexOf(NEWLINE)))

    return this.streamRend(
      remainingContent.substring(remainingContent.indexOf(NEWLINE)),
      parsed + currentBuffer[0],
      currentBuffer[1])
  }
  parseLine (line) {
    if (line.indexOf('# ') === 0) return '<h1>' + line + '</h1>'
    return [line, '<br/>']
  } */
}
