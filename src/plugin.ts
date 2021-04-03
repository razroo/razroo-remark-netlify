import visit from 'unist-util-visit';
import {matchNetlifyTitleTag, transformTitleTag} from "./removeTitleTags";

export function removeTitleTagsPlugin() {

  return async function transformer(tree: any) {
    const promises: Promise<any>[] = [];
    // console.log('tree');
    // console.log(tree);
    visit(tree, 'thematicBreak', (thematicBreakNode: any, _, parent: any) => {
      console.log('thematicBreakNode');
      console.log(thematicBreakNode);
      promises.push(
        (async () => {
          console.log('parent.children before');
          console.log(parent.children);

          parent.children.splice(parent.children.indexOf(thematicBreakNode), 1);

          console.log('parent.children after');
          console.log(parent.children);
        })(),
      );
    });

    visit(tree, 'heading', (heading: any, _) => {
      heading.depth = 1;
      visit(heading, 'text', (textNode: any, _) => {
        if (!textNode.value) {
          return;
        }

        promises.push(
          (async () => {
            const match = matchNetlifyTitleTag(textNode.value);

            if (match) {
              textNode.value = transformTitleTag(textNode.value);

              // parent.children.splice(parent.children.indexOf(heading), 1, {
              //   type: 'heading',
              //   depth: 1,
              //   value: '123'
              // });
            }
          })(),
        );
        console.log('promises');
        console.log(promises);

      })
    });

    await Promise.all(promises);
  };
}
