const fs = require('fs');
const cp = require('child_process');

const filePath = 'src/appVersion.js';

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    return console.log(err);
  }

  // get git tag
  const lastTagCommand = 'git describe --abbrev=0 --tags';
  const tagVersion = cp.execSync(lastTagCommand, { cwd: '.' }).toString().match(/[\d\.+]+/)[0];
  let result = data.replace(/appVersion\s?:\s?'\d{1,2}\.\d{1,2}\.\d{1,2}',/gm, `appVersion: '${tagVersion}',`);
  console.log(`Updated App version to  ${tagVersion}`);

  // get date
  const date = new Date();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jul', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const buildDate = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  result = result.replace(/appBuildDate\s?:\s?'[a-zA-z]{3}\s\d{1,2},\s\d{4}'/gm, `appBuildDate: '${buildDate}'`);
  console.log(`Updated build date to  ${buildDate}`);

  fs.writeFile(filePath, result, 'utf8', (writeErr) => {
    if (writeErr) return console.log(err);
    return 0;
  });
  return 0;
});
