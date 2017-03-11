# run-script-proxy
run-script-proxy calls scripts inside package.json either with npm or yarn (if used)


# install
## npm
`npm i --save-dev run-script-proxy` 

## yarn
`yarn add -D run-script-proxy` 


## usage

in package.json scripts you can now use `run` instead of `npm run` or `yarn`


## example


```
{
  "scripts": {
      "test": "run echo",
      "echo": "echo \"hello world\""
  }
}
```
