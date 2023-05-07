const fs = require('fs');
const path = require('path');
const newPath = `${path.dirname(__dirname)}/03-files-in-folder/secret-folder`;

fs.readdir(newPath, (err, files) => {
  if (err)
    throw err;
  else {
    files.forEach(file => {
      fs.stat(`${newPath}/${file}`, (err, stats) => {
        if (err) {
          throw err;
        }
        if(stats.isFile()) {
          console.log(path.basename(file, path.extname(file)).trim() + ' - ' + path.extname(file).slice(1) + ' - ' + (stats.size) + 'b');
        }
      });
    });
  }
})