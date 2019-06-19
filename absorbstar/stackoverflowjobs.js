var urlprefix = 'https://stackoverflow.com/'
var fileprefix = 'stars/stackoverflowjobs/'
var stars = [
  // {url : "jobs/274014/remote-senior-full-stack-node-react-developer-scalable-path",
  // filename : '1.md',
  // selector : '.job-details--content'},
  // {url : "jobs/273872/junior-front-end-developer-uk-home-based-surevine",
  // filename : '2.surevine.md',
  // selector : '.job-details--content'},
  {url : "jobs/273736/senior-node-react-developers-europe-remote-nearform",
  filename : '3.nearform.md',
  selector : '.job-details--content'},


]

const fs = require('fs')
const path = require('path')
// ENOENT
if (!fs.existsSync(fileprefix)){
	fs.mkdirSync(path.join(__dirname, fileprefix))
}
var absort = require('./absort')
for (var i = stars.length - 1; i >= 0; i--) {
  if(!stars[i].ignore)
    absort(urlprefix + stars[i].url,fileprefix + stars[i].filename,stars[i].selector)
}

