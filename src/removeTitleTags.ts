export function matchNetlifyTitleTag(text: string): any {
  const regex = /title./mi;
  const match = text.match(regex);
  if (!match) return null;

  return true;
}

export function transformTitleTag(netlifyTitleText: string): any {
  return netlifyTitleText.replace("title: ", "");
}
