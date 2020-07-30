import { skaldURI } from '@/plugins/skaldfire'
import { hideContent } from './hideContent'

const NEWLINE = '\n'

const NONE = -1
const PARAGRAPH = 0
const TABLE = 1
const UL = 2
const STATSBLOCK = 3
const DP_INFO = 1001
const DP_LEGEND = 1002
const DP_CODE = 1003
const DP_RESTRICTED = 1004

/**
 * Stream parser for Skald Markdown subsyntax and wikitags
 */
export default class Skaldmd {
  siteLinkStub: string
  parsing: number
  rendedHtml: string
  docpart: number
  ulLevel:number
  hiddenContent: boolean
  constructor (siteid: string) {
    siteid ? this.siteLinkStub = siteid : this.siteLinkStub = 'skald'
    this.parsing = NONE
    this.rendedHtml = ''
    this.docpart = NONE
    this.ulLevel = 0
    this.hiddenContent = false
  }

  /**
   * Sets current stream parsing mode to mode
   * @param {*} mode NONE, PARAGRAPH, TABLE, UL
   */
  setMode (mode: number) {
    this.resetMode()
    this.parsing = mode
  }

  toHtml (rawContent: string, userTags = [], allowTags = [] ) {
    if (!rawContent) return ''

    this.rendedHtml = ''

    let content = hideContent(rawContent, userTags, allowTags)

    const linesArray = content.split(NEWLINE)

    linesArray.forEach((line: string) => {

      if (this.hiddenContent) return
      // code is escaped
      if (this.docpart === DP_CODE) this.parseCode(line)
      // console.log('line', line.substring(0, 3), line.trim().length)

      // if the line is emtpy, we always just reset the parsing mode
      else if (line.trim().length === 0) this.resetMode()
      // start a docpart DP_INFO
      else if (line.indexOf('[info]') === 0) this.startPart(DP_INFO)
      // start a docpart DP_LEGEND
      else if (line.indexOf('[legend]') === 0) this.startPart(DP_LEGEND)
      // start a docpart DP_CODE
      else if (line.indexOf('```') === 0) this.startPart(DP_CODE)
      // start a docpart?
      else if (line.indexOf('[/info]') === 0 ||
        line.indexOf('```') === 0 ||
        line.indexOf('[/legend]') === 0) this.endPart()
      // #... A header
      else if (line[0] === '#') this.parseH(line)
      // -... A bullet point
      else if (line.indexOf('----') === 0) this.parseHR(line)
      // * bullet creates an UL
      // - as does dash
      else if ((line[0] === '-' || line[0] === '*') &&
        line.length > 1 &&
        (line[1] === ' ' || line[1] === '-')) this.parseUL(line)
      // a table starts
      else if (line[0] === '|') this.parseTable(line)
      else if (line.indexOf('[stats') === 0 ||
        this.parsing === STATSBLOCK) this.parseStatBlock(line)
      // In a mode, continuing
      else this.parseP(line)
    })
    this.resetMode()
    this.endPart()
    return this.rendedHtml
  }

  resetMode () {
    if (this.parsing > -1) {
      if (this.parsing === PARAGRAPH) this.rendedHtml += '</p>\n'
      if (this.parsing === UL) {
        if (this.ulLevel === 1) {
          this.rendedHtml += '</ul>\n'
          this.ulLevel = 0
        }
        this.rendedHtml += '</ul>\n'
      }
      if (this.parsing === TABLE ||
        this.parsing === STATSBLOCK) this.rendedHtml += '</table>\n'
      this.parsing = NONE
    }
  }

  endPart () {
    this.resetMode()
    if (this.docpart === DP_INFO ||
      this.docpart === DP_CODE ||
      this.docpart === DP_LEGEND) {
      this.rendedHtml += '</div>'
    }
    this.docpart = NONE
  }

  startPart (type: number) {
    // Trying to start part when in part
    if (type === this.docpart) return

    this.endPart()
    if (type === DP_INFO) {
      this.docpart = DP_INFO
      this.rendedHtml += '<div class="infodocpart">'
    }
    if (type === DP_LEGEND) {
      this.docpart = DP_LEGEND
      this.rendedHtml += '<div class="legend">\n'
    }
    if (type === DP_CODE) {
      this.docpart = DP_CODE
      this.rendedHtml += '<div class="code">\n'
    }
  }

  parseText (line: string) {
    const wikiTextExpr = '[-a-zA-Z0-9 ,.\\x2c\\x2e\\x5B\\x3A\\x7C\\x5D\\x2F]'
    // Italics
    let re = new RegExp('( _|^_)(' + wikiTextExpr + '*)(_ |_$)', 'gmu')
    line = line.replace(re, function (match, p1, p2, p3, offset, string) {
      return ' <i>' + p2 + '</i> '
    })
    re = new RegExp('( \\*|^\\*)(' + wikiTextExpr + '*)(\\* |\\*$)', 'gmu')
    line = line.replace(re, function (match, p1, p2, p3, offset, string) {
      return ' <b>' + p2 + '</b>'
    })
    line = this.rendDice(line)
    line = this.rendColors(line)
    line = this.rendWikiLinks(line)
    line = this.rendURLLinks(line)
    this.rendedHtml += line
  }

  parseCode (line: string) {
    if (line.indexOf('```') === 0) this.endPart()
    else this.rendedHtml += line + '<br/>\n'
  }

  rendColors (line: string) {
    /* console.log('rendWikiLinks', siteLinkStub, line) */
    const re = new RegExp('\\[color:(.+?)\\[\\/color\\]', 'gmu')
    line = line.replace(re, (match, p1, offset, string) => {
      const colorcode = p1.substring(0, p1.indexOf(']')).trim()
      // console.log('colorcode:', colorcode, p1)
      if (colorcode === 'green') {
        return '<span style="color:green">' + p1.substring(p1.indexOf(']') + 1, p1.length) + '</span>'
      } else if (colorcode.indexOf('#') === 0 && colorcode.length === 7) {
        return '<span style="color:' + colorcode + '">' + p1.substring(p1.indexOf(']') + 1, p1.length) + '</span>'
      } else {
        return p1
      }
    })
    return line
  }

  rendDice (line: string) {
    const re = new RegExp('\\[([0-9]*)d([0-9]*)\\]', 'gm')
    line = line.replace(re, function (match, p1, p2, offset, string) {
      let die = p2
      if (p2 === '12') die = '<i aria-hidden="true" class="v-icon notranslate mdi mdi-dice-d12 theme--dark"></i>'
      return '<span class="ndn">' + p1 + 'd </span>' + die
    })
    return line
  }

  parseStatBlock (line: string) {
    // console.log('parseStatBlock', line, this.parsing)
    // We are starting to parse a Table, add the table tag
    if (this.parsing !== STATSBLOCK) {
      this.setMode(STATSBLOCK)
      if (line.includes('box')) this.rendedHtml += '<table class="statblock box">\n'
      else this.rendedHtml += '<table class="statblock">\n'
      return
    }
    if (line.indexOf('[/stats]') === 0) {
      this.resetMode()
      return
    }
    this.rendedHtml += '<tr>'
    const statArray = line.split(' ')
    // TH
    this.rendedHtml += '<th>'
    this.parseText(statArray[0])
    this.rendedHtml += '</th>'
    // Stat field 1
    if (statArray.length > 1) {
      this.rendedHtml += '<td>'
      this.parseText(statArray[1])
      this.rendedHtml += '</td>'
    }
    // Stat field 2
    if (statArray.length > 2) {
      this.rendedHtml += '<td>'
      this.parseText(statArray[2])
      this.rendedHtml += '</td>'
    }
    // Stat field 3
    if (statArray.length > 3) {
      this.rendedHtml += '<td>'
      this.parseText(statArray[3])
      this.rendedHtml += '</td>'
    }

    this.rendedHtml += '</tr>'
  }

  parseHR (line: string) {
    this.resetMode()
    this.rendedHtml += '<hr/>\n'
  }

  /**
   * Sets mode to UL (no nesting of ul, and table, or ul), and rends the line item
   * @param {string} line the ul
   */
  parseUL (line: string) {
    if (this.parsing !== UL) {
      this.setMode(UL)
      this.rendedHtml += '<ul>\n'
    }
    if (line[1] === '-') {
      if (this.ulLevel !== 1) {
        this.ulLevel = 1
        this.rendedHtml += '<ul>\n'
      }
      this.rendedHtml += '<li>'
      this.parseText(line.substring(3))
    } else {
      if (this.ulLevel === 1) {
        this.ulLevel = 0
        this.rendedHtml += '</ul>\n'
      }
      this.rendedHtml += '<li>'
      this.parseText(line.substring(2))
    }
    this.rendedHtml += '</li>\n'
  }

  parseH (line: string) {
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
  parseP (line: string) {
    if (this.parsing !== PARAGRAPH) {
      // console.log('parseP starts paragraph')
      this.setMode(PARAGRAPH)
      this.rendedHtml += '<p>'
    } else {
      this.rendedHtml += '<br/>\n'
    }
    this.parseText(line)
  }

  parseTable (line: string) {
    // We are starting to parse a Table, add the table tag
    if (this.parsing !== TABLE) {
      this.setMode(TABLE)
      // No style set
      let props = ''
      let classes = ''
      // Border style set
      if (line.includes('border=1')) classes += ' border-1 '
      if (line.includes('wide')) classes += ' fullwidth '
      if (classes.length > 2) props += ` class="${classes}"`
      this.rendedHtml += `<table${props}>\n`
      return
    }

    this.rendedHtml += '<tr>'
    this.parseTableRow(line)
    this.rendedHtml += '</tr>\n'
  }

  /**
   * Should only be called from parseTable
   * @param {*} line line, inside table mode
   */
  parseTableRow (line: string) {
    // remobe pipe at the end, if any!
    if (line[line.length - 1] === '|') line = line.substring(0, line.length - 1)
    // remove pipe at the beginning
    const lineArray = line.substring(1).split('|')
    lineArray.forEach((cell) => {
      // Table header cell starts with a !, remove it and parse as TD
      if (line.indexOf('!') === 1) {
        this.rendedHtml += '<th>'
        this.parseText(cell.substring(1, cell.length).trim())
        this.rendedHtml += '</th>'
      } else {
        let cssClass = ''
        if (cell[0] === ' ') {
          if (cell[cell.length - 1] === ' ') cssClass = ' class="alignCenter"'
          else cssClass = ' class="alignRight"'
        }
        this.rendedHtml += `<td${cssClass}>`
        this.parseText(cell.trim())
        this.rendedHtml += '</td>'
      }
    })
  }

  rendWikiLinks (line: string) {
    /* console.log('rendWikiLinks', siteLinkStub, line) */
    const re = new RegExp('([\\[(]wiki:)(.+?)([\\])])', 'gmu')
    line = line.replace(re, (match, p1, p2, p3, offset, string) => {
      p2 = p2.trim()
      const link = p2.includes('|') ? p2.substring(p2.indexOf('|') + 1).trim() : p2
      let url = p2.split('|')[0]
      let siteid = this.siteLinkStub
      if (url.includes('/')) {
        siteid = skaldURI(url.split('/')[0].trim())
        url = url.split('/')[1]
      }
      url = skaldURI(url.trim())
      return `<a href="/#/v/${siteid}/${url}">${link}</a>`// '<a href' + p2 + '-'
    })
    return line
  }

  rendURLLinks (line: string) {
    const re = new RegExp('([\\[(]url:)(.+?)([\\])])', 'gmu')
    line = line.replace(re, (match, p1, p2, p3, offset, string) => {
      const link = p2.includes('|') ? p2.substring(p2.indexOf('|') + 1).trim() : p2
      const url = p2.split('|')[0]
      return `<a href="${url}">${link}</a>`
    })
    return line
  }
}
