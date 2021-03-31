import '@jomaxx/jest-polly';
import remark from 'remark';
import plugin from './index';
import {matchNetlifyTitleTag, transformTitleTags} from "./removeTitleTags";

const markdown = `
---
title: Introduction
---

Random text goes here
`;

test('Should match and replace netlify text', async () => {
  const sampleText = `
    ---
    title: Introduction
    ---

    This is the text after the introduction.
  `;

  let match = matchNetlifyTitleTag(sampleText);
  let expected = transformTitleTags(match);

  expect(expected).toMatchInlineSnapshot(`
    "# Introduction

    This is the text after the introduction.
    "
  `);
});

test('Should replace netlify title tag with markdown equivalent one, using remark', async () => {
  const result = await run(markdown);

  expect(result).toMatchInlineSnapshot(`
    "# Introduction

    Random Text Goes Here
    "
  `);
});

function run(string: string) {
  return new Promise((resolve, reject) => {
    remark()
      .use(plugin)
      .process(string, (err, file) => {
        if (err) reject(err);
        else resolve(String(file));
      });
  });
}
