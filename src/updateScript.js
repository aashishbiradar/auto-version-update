const fs = require('fs');

const fileName = 'appVersion.js';

fs.readFile(fileName, 'utf8', (err, data) => {
  if (err) {
    return console.log(err);
  }

  // get git tag
  let result = data.replace(/appVersion\s:\s'\d{1,2}\.\d{1,2}\.\d{1,2}',/gm, "appVersion : '22.0.10',");

  // get date
  const date = new Date();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jul', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const buildDate = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;

  result = result.replace(/appBuildDate\s:\s'[a-zA-z]{3}\s\d{1,2},\s\d{4}'/gm, `appBuildDate : '${buildDate}'`);
  console.log(result);

  fs.writeFile(fileName, result, 'utf8', (writeErr) => {
    if (writeErr) return console.log(err);
    return 0;
  });
  return 0;
});
