const MAX_CHUNK = 560;

export const QRChunker = (stringToSplit: string, maxChunk?: number) => {
  if (stringToSplit.length < MAX_CHUNK) {
    return [stringToSplit];
  }
  const chunks = [];
  const numberChunks = Math.floor(
    stringToSplit.length / (maxChunk || MAX_CHUNK)
  );
  for (let i = 0; i < numberChunks; i++) {
    const checksum = `${i + 1}/${numberChunks}-`;
    chunks.push(
      checksum +
        stringToSplit.slice(
          (stringToSplit.length / numberChunks) * i,
          (stringToSplit.length / numberChunks) * (i + 1)
        )
    );
  }
  return chunks;
};
