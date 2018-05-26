# mean1

This project was generated with the [Angular Full-Stack Generator](https://github.com/DaftMonk/generator-angular-fullstack) version 4.2.3.

## Getting Started

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js and npm](nodejs.org) Node >= 4.x.x, npm >= 2.x.x
- [Gulp](http://gulpjs.com/) (`npm install --global gulp`)
- [MongoDB](https://www.mongodb.org/) - Keep a running daemon with `mongod`

### Developing

1. Run `npm install` to install server dependencies.

2. Run `mongod` in a separate shell to keep an instance of the MongoDB Daemon running

3. Run `gulp serve` to start the development server. It should automatically open the client in your browser when ready.

3.b RH run `gulp serve:debug` to have gulp call
        gulp.task('start:server:debug', () => {
            process.env.NODE_ENV = process.env.NODE_ENV || 'development';
            config = require(`./${serverPath}/config/environment`);
            // nodemon(`-w ${serverPath} --debug=5858 --debug-brk ${serverPath}`)
            nodemon(`-w ${serverPath} --inspect --debug-brk ${serverPath}`)
                .on('log', onServerLog);
        });

Then have a C:\ajs\mean1\.vscode\launch.json with 
{
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "attach",
            "name": "Launch Program",
            "address": "localhost",
            "port": 9229
        }
    ]
}

https://developers.facebook.com/docs/facebook-login/permissions

## Build & development

Run `gulp build` for building and `gulp serve` for preview.

## Testing

Running `npm test` will run the unit tests with karma.
