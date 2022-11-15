export const chunkString = (stringToChunk: string, numChunks: number) => {
  const tempArray = [];

  const chunkSize = Math.max(1, stringToChunk.length / numChunks - 1);

  for (let i = 0; i < stringToChunk.length; i += chunkSize) {
    const chunk = stringToChunk.slice(i, i + chunkSize);
    tempArray.push(chunk);
  }

  return tempArray as string[];
}
