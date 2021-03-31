import visit from 'unist-util-visit';
import {matchNetlifyTitleTag, transformTitleTags} from "./removeTitleTags";


export function removeTitleTagsPlugin() {

  return async function transformer(tree: any) {
    const promises: Promise<any>[] = [];

    visit(tree, 'header', (paragraph: any, _, parent: any) => {
      if (paragraph.children.length !== 1) {
        return;
      }

      promises.push(
        (async () => {
          const match = matchNetlifyTitleTag(paragraph);

          if (match) {
            parent.children.splice(parent.children.indexOf(paragraph), 1, {
              type: 'paragraph',
              value: transformTitleTags(match)
            });
          }
        })(),
      );
    });

    await Promise.all(promises);
  };
}
