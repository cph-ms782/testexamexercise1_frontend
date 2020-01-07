# Spollow - follow sports

This is a client for login in or out of REST endpoint and for fetching data when logged in.  
Set REST endpoint URL in file **src/settings.js**   (not included.
endpoint server can be found here:  
https://github.com/cph-ms782/SemesterProjekt_Backend

## Deployment instructions
First clone project.  
In cloned folder using a terminal enter:  
#### `npm install`  
and
#### `npm install react-router-dom`  
to install prerequisites


If you want to deploy in tomcat or nginx add the following to package.json:  
#### `"homepage": ".",`

ie. the first four lines could look like this:  
`"name": "react_security",`  
  `"version": "0.1.0",`  
  `"private": true,`  
  `"homepage": ".",`  

When all is ready to deploy:

#### `npm run build`

## Deploy via tomcat
Put files from build inside backend's web pages folder (so that index.html is at the root of the folder. Remember to use HashRouter as router and to add homepage to package.json (see above)


