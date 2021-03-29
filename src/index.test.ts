import '@jomaxx/jest-polly';
import remark from 'remark';
import plugin from './index';

const markdown = `
---
title: Introduction
---

Random text goes here
`;

test('embeds code snippet', async () => {
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
