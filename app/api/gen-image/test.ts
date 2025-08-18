// npx tsx --env-file=.env app/api/gen-image/test.ts "A tiny turtle on a surfboard"
// node --env-file=.env --import=tsx app/api/gen-image/test.ts "A tiny turtle on a surfboard"


import { openaiGenImage } from "./openai-gen-image";

const prompt = process.argv[2] || "World";

openaiGenImage(prompt)
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


