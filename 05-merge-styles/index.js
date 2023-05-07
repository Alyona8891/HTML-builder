const fs = require('fs');
const path = require('path');
const newPath = `${path.dirname(__dirname)}/05-merge-styles/styles`;
const writeStream = fs.createWriteStream('05-merge-styles/project-dist/bundle.css');

fs.readdir(newPath, (err, files) => {
  if(err) {
    throw err;
  } else {
    files.forEach(file => {
      if(path.extname(file) === '.css') {
        const readableStream = fs.createReadStream(`${newPath}/${file}`, 'utf-8');
        readableStream.pipe(writeStream);
      }
    });
  }
});