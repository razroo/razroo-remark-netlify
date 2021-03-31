const fs = require('fs')
const unified = require('unified')
const markdown =require('remark-parse')

export function matchNetlifyTitleTag(text: any): any {
  const regex = /---\s*title.*\s*---/mi
  const match = text.match(regex);

  return match;
}

export function removeTitleTags(text: any
): any {

    const regex = /---\s*title.*\s*---/mi
    const match = text.match(regex);

    let modifiedFile

    if (match) {
        let titleText = match.toString()
        const arrayOfTitleText = titleText.match(/title:(.*)/);
        if (arrayOfTitleText) {
            console.log("trying new regex:" + arrayOfTitleText[1]);
            let newTitleText = '# ' + arrayOfTitleText[1];
            modifiedFile = text.replace(titleText, newTitleText);
        }

    }

    return match;
}
