const fs = require('fs');
const path = require('path');
const readableStream = fs.createReadStream('01-read-file/text.txt', 'utf-8');

readableStream.on('data', text => console.log(text));