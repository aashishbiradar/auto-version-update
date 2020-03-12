const fs = require('fs');
const gitVersion = require('git-tag-version');

const filePath = 'src/appVersion.js';


fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    return console.log(err);
  }

  // get git tag
  const tagVersion = gitVersion();
  let result = data.replace(/appVersion\s?:\s?'\d{1,2}\.\d{1,2}\.\d{1,2}',/gm, `appVersion: '${tagVersion}',`);
  console.log(`Updated App version to  ${tagVersion}`);

  // get date
  const date = new Date();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jul', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const buildDate = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;

  result = result.replace(/appBuildDate\s?:\s?'[a-zA-z]{3}\s\d{1,2},\s\d{4}'/gm, `appBuildDate: '${buildDate}'`);
  console.log(`Updated build to  ${tagVersion}`);

  fs.writeFile(filePath, result, 'utf8', (writeErr) => {
    if (writeErr) return console.log(err);
    return 0;
  });
  return 0;
});

console.log(gitVersion());
