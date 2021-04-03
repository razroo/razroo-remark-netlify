import visit from 'unist-util-visit';
import {matchNetlifyTitleTag, transformTitleTag} from "./removeTitleTags";

export function removeTitleTagsPlugin() {

  // right now parser is removing all thematic breaks
  // we will have to update the logic so that
  return async function transformer(tree: any) {
    const promises: Promise<any>[] = [];
    visit(tree, 'thematicBreak', (thematicBreakNode: any, _, parent: any) => {
      promises.push(
        (async () => {
          parent.children.splice(parent.children.indexOf(thematicBreakNode), 1);
        })(),
      );
    });

    visit(tree, 'heading', (heading: any, _) => {
      visit(heading, 'text', (textNode: any, _) => {
        if (!textNode.value) {
          return;
        }

        promises.push(
          (async () => {
            const match = matchNetlifyTitleTag(textNode.value);

            if (match) {
              heading.depth = 1;
              textNode.value = transformTitleTag(textNode.value);
            }
          })(),
        );
      })
    });

    await Promise.all(promises);
  };
}
