import '@jomaxx/jest-polly';
import remark from 'remark';
import plugin from './index';
// import {transformTitleTags} from "./removeTitleTags";

const markdown = `
---
title: Introduction
---

Random text goes here
`;

// test('Should transform netlify text', async () => {
//   const sampleText = `
//     ---
//     title: Introduction
//     ---
//   `;
//
//   let expected = transformTitleTags(sampleText);
//
//   expect(expected).toMatchInlineSnapshot(`"#  Introduction"`);
// });

test('Should replace netlify title tag with markdown equivalent one, using remark', async () => {
  const result = await run(markdown);

  expect(result).toMatchInlineSnapshot(`
    "# Introduction

    Random text goes here
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
