const fs = require('fs');
const fsPr = require('fs').promises;
const path = require('path');

let template = '';

async function saveTemplateFile() {
  try {
    template = await fsPr.readFile(path.join(__dirname, 'template.html'), 'utf-8');
  } catch(err) {
    console.log(err);
  }
}

async function searchTagsTemplateFile() {
  try {
    let regex = /{{(\w+)}}/g;
    const arrRegex = template.match(regex);
    for(let reg of arrRegex) {
      let componentText =  await fsPr.readFile(path.join(__dirname, '/components/', `${reg.slice(2, -2)}.html`), 'utf-8');
      template = template.replace(reg, componentText);
    }
  } catch(err) {
    console.log(err);
  }
}

async function createFileHtml() {
  try{
    await fsPr.writeFile(path.join(__dirname, 'project-dist', 'index.html'), template);
  } catch(err) {
    console.log(err);
  }
}

async function createFileCss() {
  try {
    const writeStream = fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'));
    fs.readdir(path.join(__dirname, 'styles'), (err, files) => {
      for (let file of files) {
        if(path.extname(file) === '.css') {
          const readableStream = fs.createReadStream(path.join(__dirname, 'styles', file), 'utf-8');
          readableStream.pipe(writeStream);
        }
      }});
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

async function copyAssets(currentSrc, copySrc) {
  try {
    const files = await fsPr.readdir(currentSrc);
    for(let file of files) {
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
          await copyAssets(newCurrentSrc, newCopySrc);
        }
      } catch(err) {
        console.log(err);
      }  
    }
  } catch(err) {
    console.log(err);
  }
}

async function build() {
  await saveTemplateFile();
  await searchTagsTemplateFile();
  await createFolder(path.join(__dirname, 'project-dist'));
  await createFileHtml();
  await createFileCss();
  await createFolder(path.join(__dirname, 'project-dist', 'assets'));
  await copyAssets(path.join(__dirname, 'assets'), path.join(__dirname, 'project-dist', 'assets'));
}

build();
