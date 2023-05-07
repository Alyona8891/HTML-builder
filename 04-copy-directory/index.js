const fsPr = require('fs').promises;
const fs = require('fs');
const path = require('path');
const newPath = `${path.dirname(__dirname)}/04-copy-directory/files`;

fsPr.mkdir(
  path.join(__dirname, 'files-copy'),
  {
    recursive: true
  },
  err => {
    if(err) {
      throw err;
    }
  });

fs.readdir(newPath, (err, files) => {
  if(err) {
    throw err;
  } else {
    files.forEach(file => {
      fs.copyFile(`04-copy-directory/files/${file}`, `04-copy-directory/files-copy/${file}`, (err) => {
        if(err) {
          throw err;
        }
      });
    });
  }
});