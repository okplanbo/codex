# Simple TODO App exercise with React + TS

Bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Main scripts

### `npm start`

Runs in dev mode.

### `npm test`

Runs tests. See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Tip: how to deploy React App to GitHub Pages

1. run `npm install --save-dev gh-pages` in your project's folder
2. add to package.json:
```
"homepage": "https://your-account.github.io/your-repo"
"scripts": {
	"predeploy" : "npm run build",
	"deploy" : "gh-pages -d build"
