const NEWLINE = '\n'

export default class Skaldmd {
  toHtml (rawContent) {
    if (!rawContent) return ''

    let rendedHtml = ''

    let linesArray = rawContent.split(NEWLINE)

    let inArray = false
    linesArray.forEach((line) => {
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
      } else if (inArray && line.indexOf('|') === 0) {
        console.log('inArray', line)
        rendedHtml += this.rendTableLine(line)
      } else if (inArray) {
        rendedHtml += '<tr><td>' + this.rendLine(line) + '</td></tr></table>'
        inArray = false
        console.log('endOfArray', line)
      } else rendedHtml += this.rendLine(line) + '<br/>\n'
    })
    // console.log('raw, ', rawContent, 'rended,', rendedHtml)
    return rendedHtml
  }

  rendTableLine (line) {
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
    // _italic_
    const re = new RegExp('(^_| _)(\\w+[\\w ]*)(_ |_$)', 'gm')
    line = line.replace(re, function (match, p1, p2, p3, offset, string) {
      return '<i>' + p2 + '</i>'
    })
    // *bold*
    return line
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
