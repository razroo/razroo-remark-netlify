const fs = require('fs')

export function matchPermalink(text: string
): any {

    const regex = /---\s*title.*\s*---/mi
    const match = text.match(regex);
    let newString;

    if (match) {
        let s = match.toString()
       
/*if(test)
const test =s.match(/title:(.*)/);
{
    console.log("trying new regex:"+test[1]);
}
*/
        newString = s.replace("---", "");
        newString = newString.replace("title:", "#");
        newString = newString.replace("---", "");
    }

    console.log(`new string: ${newString}`);
    return newString
}




try {
    const data = fs.readFileSync('/Users/yakovepstein/projects/razroo/angular-content/main-book.md', 'utf8')

    console.log(matchPermalink(data))
} catch (err) {
    console.error(err)
}