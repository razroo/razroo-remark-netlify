import visit from 'unist-util-visit';
import {matchNetlifyTitleTag, transformTitleTags} from "./removeTitleTags";


export function removeTitleTagsPlugin() {

  return async function transformer(tree: any) {
    const promises: Promise<any>[] = [];

    visit(tree, 'header', (header: any, _, parent: any) => {
      if (header.children.length !== 1) {
        return;
      }

      promises.push(
        (async () => {
          const match = matchNetlifyTitleTag(header);

          if (match) {
            parent.children.splice(parent.children.indexOf(header), 1, {
              type: 'header',
              value: transformTitleTags(match)
            });
          }
        })(),
      );
    });

    await Promise.all(promises);
  };
}
