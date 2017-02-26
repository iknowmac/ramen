# RaMEN Starter Project
**React, MongoDB, Express, & Node**

## Features

### Client
- [webpack](http://webpack.github.io/) and [webpack-dev-server](https://webpack.github.io/docs/webpack-dev-server.html) as a client-side module builder and module loader.
- [React](https://facebook.github.io/react/) and [JSX](https://facebook.github.io/jsx/) as a virtual Dom JavaScript library for rendering user interfaces (views).
- [Redux](http://redux.js.org/) as an incredibly simple way of modelling your data app state, with great community support.
- [Redux DevTools](https://github.com/gaearon/redux-devtools) as a live-editing environment for your Redux apps.
- [eslint-plugin-react](https://github.com/yannickcr/eslint-plugin-react) for additional React specific linting rules.
- [Sass](http://sass-lang.com/) as a compiler of CSS styles with variables, mixins, and more.

### Server

- [Node](http://nodejs.org/) as an event-driven, non-blocking I/O model that is lightweight and efficient.
- [Express](http://expressjs.com/) is a fast, un-opinionated, minimalist web framework for Node.js
- [MongoDB](https://www.mongodb.com/) as a document-oriented database designed for scalability.
- [Mongoose](http://mongoosejs.com/) is an elegant mongodb object modeling system for node.js

### Shared

- [npm](https://www.npmjs.com/) as a package manager and task runner (say [**NO**](http://blog.keithcirkel.co.uk/why-we-should-stop-using-grunt/) to gulp/grunt).
- [Babel](http://babeljs.io/) 6 as a transpiler from ES6 to ES5.
- [ESLint](http://eslint.org/) as a reporter for syntax and style issues.
- [Mocha](https://mochajs.org/) as a test framework.
- [Chai](http://chaijs.com/) as a BDD assertion library that works along with `Mocha`.

## Getting Started
### Install the app
```
$ git clone https://github.com/towen/ramen.git app-name
$ cd app-name
$ npm install
```
### Add the sample data
```
$ npm run seed
```
### Start the app
```
$ npm start
```

## Development

There are two ways to build and run the web app:

* ***Development*** via the webpack dev server:
  * `$ npm start`
  * Open http://localhost:3000/ in your browser, pages 'hot reload' automatically when there are changes

* ***Production*** client:
  * `$ npm run build`
  * Open http://localhost:8080 in your browser

## Testing
```
$ npm test
```

## TODO

- [ ] Make the whole project less opinionated
- [ ] Implement [Flow](https://flowtype.org/) for type checking
- [ ] Add more tests

## License

[MIT](./LICENSE.md)
