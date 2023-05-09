const fsPr = require('fs').promises;
const path = require('path');

async function copyDir() {

  async function delFolder(src) {
    try {
      await fsPr.rm(src, {recursive: true});
    } catch(err) {
      console.log(err);
    }
  }

  async function createFolder(src) {
    try {
      await fsPr.mkdir(src, {recursive: true});
    } catch(err) {
      console.log(err);
    }
  }
  
  async function copyFiles(currentSrc, copySrc) {
    try {
      const files = await fsPr.readdir(currentSrc);
      for(const file of files) {
        const newCurrentSrc = path.join(currentSrc, file);
        const newCopySrc = path.join(copySrc, file);
        try {
          const stats = await fsPr.stat(newCurrentSrc);
          if (stats.isFile()) {
            try {
              await fsPr.copyFile(newCurrentSrc, newCopySrc);
            } catch(err) {
              console.log(err);
            }
          } else {
            await createFolder(newCopySrc);
            await copyFiles(newCurrentSrc, newCopySrc);
          }
        } catch(err) {
          console.log(err);
        }  
      }
    } catch(err) {
      console.log(err);
    }
  }

  try {
    await fsPr.access(path.join(__dirname, 'files-copy'));
    await delFolder(path.join(__dirname, 'files-copy'));
    await createFolder(path.join(__dirname, 'files-copy'));
  } catch(err) {
    await createFolder(path.join(__dirname, 'files-copy'));
  }

  await copyFiles(path.join(__dirname, 'files'), path.join(__dirname, 'files-copy'));
}
  
copyDir();