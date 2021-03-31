export function matchNetlifyTitleTag(text: string): any {
  const regex = /---\s*title.*\s*---/mi
  console.log('text');
  console.log(text);

  const match = text.match(regex);

  return match;
}

export function transformTitleTags(titleText: string): any {
  const arrayOfTitleText = titleText.match(/title:(.*)/);

  if(arrayOfTitleText) {
    return '# ' + arrayOfTitleText[1];
  }
}
