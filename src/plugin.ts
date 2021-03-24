import visit from 'unist-util-visit';
import {removeTitleTags} from "./removeTitleTags";

export function githubPermalinksPlugin({}) {

  return async function transformer(tree: any) {
    const promises: Promise<any>[] = [];

    visit(tree, 'paragraph', (paragraph: any, _, parent: any) => {
      if (paragraph.children.length !== 1) {
        return;
      }

      promises.push(
        (async () => {
          const match = removeTitleTags(context);

          if (match) {
            parent.children.splice(parent.children.indexOf(paragraph), 1);
          }
        })(),
      );
    });

    await Promise.all(promises);
  };
}
