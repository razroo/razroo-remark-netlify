import visit from 'unist-util-visit';
import {matchNetlifyTitleTag, transformTitleTags} from "./removeTitleTags";

export function removeTitleTagsPlugin() {

  return async function transformer(tree: any) {
    const promises: Promise<any>[] = [];

    visit(tree, 'heading', (heading: any, _, parent: any) => {
      if (heading.children.length !== 1) {
        return;
      }

      promises.push(
        (async () => {
          const match = matchNetlifyTitleTag(heading);

          if (match) {
            parent.children.splice(parent.children.indexOf(heading), 1, {
              type: 'heading',
              value: await transformTitleTags(match)
            });
          }
        })(),
      );
    });

    await Promise.all(promises);
  };
}
