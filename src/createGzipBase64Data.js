// Datei: createGzipBase64Data.js
import pako from 'pako';

export function createGzipBase64Data(text) {
    // UTF-8 Text in ein Uint8Array umwandeln
    const encoder = new TextEncoder();
    const utf8Encoded = encoder.encode(text);

    // Mit Gzip komprimieren
    const gzipCompressed = pako.gzip(utf8Encoded);

    // In Base64-kodierten String umwandeln
    const base64Encoded = btoa(String.fromCharCode.apply(null, gzipCompressed));

    return base64Encoded;
}
