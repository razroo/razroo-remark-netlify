import visit from 'unist-util-visit';
import {removeTitleTags} from "./removeTitleTags";
import {extname} from "path";

export function githubPermalinksPlugin({}) {

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
              value: await removeTitleTags(match),
            });
          }
        })(),
      );
    });

    await Promise.all(promises);
  };
}
