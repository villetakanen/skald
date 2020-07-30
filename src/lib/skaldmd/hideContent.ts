/**
 * Stream parser for Skald Markdown subsyntax and wikitags
 */
export function hideContent (rawContent: string, userTags = [], allowTags = [] ): string {
    const linesArray = rawContent.split('\n')
    let parsedContent = ''
    let inHiddenContent = false

    linesArray.forEach((line) => {
      if (line.toLowerCase().indexOf('// restricted') === 0) inHiddenContent = true
      else if (inHiddenContent) {
        if (line.toLowerCase().indexOf('// end restricted') === 0) {
            inHiddenContent = false
            parsedContent += '\n'
        }
      }
      else {
        if (line.indexOf('//') !== 0) parsedContent += line +'\n'
      }
    })

    return parsedContent
}