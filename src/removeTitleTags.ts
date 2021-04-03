export function matchNetlifyTitleTag(text: any): any {
  console.log('text');
  console.log(text);

  // const regex = /---\s*title.*\s*---/mi;
  // const match = text.children[0].value.match(regex);
  // if (!match) return null;
  return true;
}

export function transformTitleTags(titleText: string): any {
  const arrayOfTitleText = titleText.match(/title:(.*)/);

  if(arrayOfTitleText) {
    return '# ' + arrayOfTitleText[1];
  }
}
