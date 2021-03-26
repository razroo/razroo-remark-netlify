import visit from 'unist-util-visit';
import {removeTitleTags} from "./removeTitleTags";


export function removeTitleTagsPlugin({}) {

  return async function transformer(tree: any) {
    const promises: Promise<any>[] = [];

    visit(tree, 'paragraph', (paragraph: any, _, parent: any) => {
      if (paragraph.children.length !== 1) {
        return;
      }

      promises.push(
        (async () => {
          const match = removeTitleTags(paragraph);


          if (match) {
            parent.children.splice(parent.children.indexOf(paragraph), 1, {
              type: 'paragraph',
              value: tex.replace(titleText, replaceTitleTags(match,tree));
            });
          }
        })(),
      );
    });

    await Promise.all(promises);
  };
}

function replaceTitleTags(match,text) {
  let titleText = match.toString()
  let newTitleText
  let modifiedFile
  const arrayOfTitleText = titleText.match(/title:(.*)/);
  if (arrayOfTitleText) {
    console.log("trying new regex:" + arrayOfTitleText[1]);
    let newTitleText = '# ' + arrayOfTitleText[1];
    modifiedFile = text.replace(titleText, newTitleText);

  }
  return newTitleText
}
