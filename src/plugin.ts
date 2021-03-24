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
          const match = removeTitleTags(context);

          if (match) {
            parent.children.splice(parent.children.indexOf(paragraph), 1, {
              type: 'code',
              lang: image.title || extname(match.path).slice(1),
              value: await getSnippet(match),
            });
          }
        })(),
      );
    });

    await Promise.all(promises);
  };
}
