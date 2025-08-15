/**
 * Decode Cairo's core::byte_array::ByteArray to UTF-8 string.
 * Works for starknet.js call results where ByteArray is represented as:
 * { data: bytes31[], pending_word: felt252, pending_word_len: felt252 }
 */
/**
 * Simplified ByteArray decoder based on Cairo documentation.
 * ByteArray format: [data_len, ...data_words, pending_word, pending_word_len]
 * Where data_words are felt252 values containing up to 31 bytes each.
 */
export function decodeByteArray(byteArray: any): string {
  if (!byteArray) return "";

  try {
    console.log("Decoding ByteArray:", byteArray);

    let data: any[] = [];
    let pendingWord = 0n;
    let pendingWordLen = 0;

    if (Array.isArray(byteArray)) {
      // Standard Cairo ByteArray format: [data_len, ...data, pending_word, pending_word_len]
      if (byteArray.length >= 3) {
        const dataLen = Number(byteArray[0]);
        data = byteArray.slice(1, 1 + dataLen);
        pendingWord = BigInt(byteArray[1 + dataLen] || 0);
        pendingWordLen = Number(byteArray[1 + dataLen + 1] || 0);
        console.log(`ByteArray format - dataLen: ${dataLen}, pendingWordLen: ${pendingWordLen}`);
      } else if (byteArray.length === 1) {
        // Single felt252 (short string)
        const felt = BigInt(byteArray[0]);
        if (felt !== 0n) {
          const result = feltToString(felt);
          console.log(`Short string result: "${result}"`);
          return result;
        }
      }
    } else if (byteArray.data !== undefined) {
      // Object format: { data: [...], pending_word: felt, pending_word_len: number }
      data = byteArray.data || [];
      pendingWord = BigInt(byteArray.pending_word || 0);
      pendingWordLen = Number(byteArray.pending_word_len || 0);
      console.log(`Object format - dataLen: ${data.length}, pendingWordLen: ${pendingWordLen}`);
    } else if (typeof byteArray === 'string' || typeof byteArray === 'number' || typeof byteArray === 'bigint') {
      // Direct felt252 value (short string)
      const felt = BigInt(byteArray);
      if (felt !== 0n) {
        const result = feltToString(felt);
        console.log(`Direct felt result: "${result}"`);
        return result;
      }
    }

    // Decode the ByteArray data
    const bytes: number[] = [];

    // Process each 31-byte chunk in the data array
    for (const felt of data) {
      if (!felt) continue;
      const feltBytes = feltToBytes(BigInt(felt), 31);
      bytes.push(...feltBytes);
    }

    // Process the pending word (partial chunk)
    if (pendingWord && BigInt(pendingWord) !== 0n && pendingWordLen > 0) {
      const pendingBytes = feltToBytes(BigInt(pendingWord), pendingWordLen);
      bytes.push(...pendingBytes);
    }

    // Convert bytes to UTF-8 string
    const result = utf8Decode(bytes.filter(b => b !== 0));
    console.log(`ByteArray decode result: "${result}"`);
    return result;
  } catch (error) {
    console.warn("Failed to decode ByteArray:", error, "Input:", byteArray);
    return "";
  }
}

/**
 * Convert a felt252 to string (for short strings up to 31 chars)
 */
function feltToString(felt: bigint): string {
  if (felt === 0n) return "";
  
  const bytes = feltToBytes(felt, 31);
  return utf8Decode(bytes.filter(b => b !== 0));
}

/**
 * Encode a UTF-8 string to Cairo's core::byte_array::ByteArray format.
 * Returns an array: [data_len, ...data_words, pending_word, pending_word_len]
 */
export function encodeByteArray(str: string): string[] {
  if (!str) return ["0", "0", "0"];

  const bytes = Array.from(new TextEncoder().encode(str));
  const words: string[] = [];
  let pendingWord = "0";
  let pendingWordLen = 0;

  // Pack bytes into 31-byte words (felts)
  for (let i = 0; i < bytes.length; i += 31) {
    const chunk = bytes.slice(i, i + 31);
    if (chunk.length === 31) {
      // Full 31-byte word - pack in big-endian order
      let felt = 0n;
      for (let j = 0; j < chunk.length; j++) {
        felt = (felt << 8n) + BigInt(chunk[j]);
      }
      words.push("0x" + felt.toString(16));
    } else {
      // Partial word (pending_word) - pack in big-endian order
      pendingWordLen = chunk.length;
      let felt = 0n;
      for (let j = 0; j < chunk.length; j++) {
        felt = (felt << 8n) + BigInt(chunk[j]);
      }
      pendingWord = "0x" + felt.toString(16);
    }
  }

  return [
    words.length.toString(),
    ...words,
    pendingWord,
    pendingWordLen.toString(),
  ];
}

/**
 * Convert a felt into an array of bytes, big-endian order.
 * Only extracts the meaningful bytes (removes leading zeros).
 */
function feltToBytes(felt: bigint, maxLen: number): number[] {
  if (felt === 0n) return [];

  const hex = felt.toString(16);
  const bytes: number[] = [];

  // Pad to even length
  const paddedHex = hex.length % 2 === 0 ? hex : "0" + hex;

  for (let i = 0; i < paddedHex.length && bytes.length < maxLen; i += 2) {
    bytes.push(parseInt(paddedHex.slice(i, i + 2), 16));
  }

  return bytes;
}

/**
 * Convert array of bytes into a UTF-8 string.
 */
function utf8Decode(bytes: number[]): string {
  if (typeof TextDecoder !== "undefined") {
    return new TextDecoder("utf-8", { fatal: false }).decode(
      new Uint8Array(bytes)
    );
  }
  // Fallback (Node.js)
  return Buffer.from(bytes).toString("utf8");
}

/**
 * Convert IPFS hash (string) to felt252 for storage
 */
export function ipfsHashToFelt252(ipfsHash: string): string {
  // Remove 'Qm' prefix if present and convert to bytes
  const cleanHash = ipfsHash.startsWith("Qm") ? ipfsHash.slice(2) : ipfsHash;

  // Convert the hash to bytes and then to felt252
  // Note: This is a simplified conversion. In production, you might want
  // to use a proper base58 decoder for IPFS hashes
  const encoder = new TextEncoder();
  const bytes = encoder.encode(cleanHash);

  let felt = 0n;
  for (let i = 0; i < Math.min(bytes.length, 31); i++) {
    felt = (felt << 8n) + BigInt(bytes[i]);
  }

  return "0x" + felt.toString(16);
}

/**
 * Convert felt252 back to IPFS hash string
 */
export function felt252ToIpfsHash(felt: string | bigint): string {
  const feltBig = typeof felt === "string" ? BigInt(felt) : felt;

  if (feltBig === 0n) return "";

  // Convert back to bytes
  const bytes: number[] = [];
  let temp = feltBig;

  while (temp > 0n) {
    bytes.unshift(Number(temp & 0xffn));
    temp = temp >> 8n;
  }

  // Convert bytes back to string and add 'Qm' prefix
  const decoder = new TextDecoder("utf-8", { fatal: false });
  const hashString = decoder.decode(new Uint8Array(bytes));

  return "Qm" + hashString;
}
