const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;

fs.writeFile(
  path.join(__dirname, 'text.txt'), 
  '',
  (err) => {
    if(err) {
      throw err;
    } else {
      console.log('Hi, dear! Enter your text, please');
    }
  }
);

stdin.on('data', data => {
  if(data.toString().trim() !== 'exit') {
    fs.appendFile(
      path.join(__dirname, 'text.txt'),
      data,
      (err) => {
        if(err) {
          throw err;
        }
      });
  } else if(data.toString().trim() === 'exit') {
    console.log('Bye, dear!');
    process.exit();
  }
});

process.on('SIGINT', () => {
  stdout.write('Bye, dear!');
  process.exit();
});