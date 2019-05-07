## Monitoring multiple directories
By default nodemon monitors the current working directory. If you want to take control of that option, use the --watch option to add specific paths:

nodemon --watch app --watch libs app/server.js
Now nodemon will only restart if there are changes in the ./app or ./libs directory. By default nodemon will traverse sub-directories, so there's no need in explicitly including sub-directories.

Don't use unix globbing to pass multiple directories, e.g `--watch ./lib/*`, it won't work. You need a --watch flag per directory watched.

## SOLUTION for "Not able to start nodemon server: Exception in nodemon killing node"

	rm -rf /usr/local/lib/node_modules/nodemon
	npm i nodemon -g

Global libraries. You can run npm list -g to see where global libraries are installed. On Unix systems they are normally placed in /usr/local/lib/node or /usr/local/lib/node_modules when installed globally. If you set the NODE_PATH environment variable to this path, the modules can be found by node.