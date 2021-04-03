export function matchNetlifyTitleTag(text: string): any {
  const regex = /title./mi;
  const match = text.match(regex);
  if (!match) return null;

  return true;
}

export function transformTitleTag(netlifyTitleText: string): any {
  console.log('netlifyTitleText');
  console.log(netlifyTitleText);
  const transformedText = netlifyTitleText.replace("title: ", "");
  console.log('transformedText');
  console.log(transformedText);

  return transformedText
}
