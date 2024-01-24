import { Transform } from "stream";

const transform = async () => {
  const reverseTransformStream = new Transform({
    transform(chunk, encoding, callback) {
      const reversedChunk = chunk.toString().split("").reverse().join("");
      this.push(reversedChunk);
      callback();
    },
  });

  process.stdin.pipe(reverseTransformStream).pipe(process.stdout);
};

transform();
