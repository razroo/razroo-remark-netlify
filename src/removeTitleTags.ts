const fs = require('fs')
const unified = require('unified')
const markdown =require('remark-parse')

export function removeTitleTags(text: any
): any {

    const regex = /---\s*title.*\s*---/mi
    const match = text.match(regex);

    let modifiedFile
    let fileASV

    if (match) {
        let titleText = match.toString()
        const arrayOfTitleText = titleText.match(/title:(.*)/);
        if (arrayOfTitleText) {
            console.log("trying new regex:" + arrayOfTitleText[1]);
            let newTitleText = '# ' + arrayOfTitleText[1];
            modifiedFile = text.replace(titleText, newTitleText);

            /*fs.writeFile('~test.txt', modifiedFile, {flag: 'a+'}, (err: any) => {
                if (err) {
                    console.error(err)
                    return
                }
                //file written successfully
            })
            */



        }

    }


    //console.log(fileASV)



    return match;
}


try {
    const data = fs.readFileSync('/Users/yakovepstein/projects/razroo/angular-content/main-book.md', 'utf8')

    console.log(removeTitleTags(data))
} catch (err) {
    console.error(err)
}