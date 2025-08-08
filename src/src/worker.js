// Placeholder for Web Worker implementation
// Can postMessage and onmessage to run convertToAscii off main thread
self.onmessage = async ({ data }) => {
  const { imageData, options } = data;
  // importScripts logic or port convertToAscii here
  // postMessage({ ascii: '...'});
};
