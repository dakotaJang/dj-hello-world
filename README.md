# DJ Hello World
Demonstration of using single project to publish npm package for multiple builds.

## Description
This project attempts to use one source code to distribute multiple packages.
By writing the source code in Typescript we can strongly type all of the defined functions. Also when compiling the Typescript code, we need to decide what module code generation to use. In this project the code is compiled to ```esm``` and ```cjs``` using ```rollup.js```. Before publishing the package to NPM, we need write a ```package.json```. To avoid having to write and modify multiple ```package.json``` and ```README.md```, ```postbuild.js``` have been written to copy, stamp, and modify some parts of the templates and place them in the package folder.

## Key Structure
- ```src``` - Contains all your source code
- ```templates``` - Contains template files for your packages, such as ```README.md``` and ```package.json```.
- ```package.json``` - Define all your build, pack, publish instructions here.
- ```postbuild.js``` - Here we defines the instructions for copying and stamping the templates to the build folder. Hopefully in the future we have a package for this so that we can use a configuration file instead writing a entire script for copying files.
- ```rollup.config.js``` - Contains rules for each out format (iife/cjs/esm).

## Build
To avoid building on top of redundant files from previous build, delete ```packages``` folder.
To build the packages, run:
```
npm run build
```

## Publish
To publish all of the packages first run the build command then run:
```
npm run publish:all
```

## Using the Package
Before anything we should install the dependencies:
```
npm i dj-hello-world dj-hello-world-es dj-hello-world-iife
```

### Via script tag
Write a html file importing the script.
```html
<!-- you can import from node_modules -->
<script src="node_modules/dj-hello-world/index.js"></script>
<!-- or import from unpkg -->
<script src="https://unpkg.com/dj-hello-world@0.0.11/index.js"></script>
```
After importing the script you can use the global variable ```DJ_Hello_World```.
```html
<script>
  let world = new DJ_Hello_World.World();
  world.sayHello();
</script>
```
Check the printed messages in the console from browser's Developer Tools tab.

### ES module
Add the following script as ```type="module"``` in a html file.
```js
import { World, Language } from "node_modules/dj-hello-world/index.esm.js";

const newWorld = new World();
newWorld.sayHello();

newWorld.setLanguage(Language.Chinese);
newWorld.sayHello();
```
Check the printed messages in the console from browser's Developer Tools tab.

### Node.js
Node.js uses CommonJS for managing packages. Meaning it uses the ```require``` function to import the packages. Run the following script in node.js.
```js
const djHelloWorld = require("dj-hello-world");
const helloWorld = djHelloWorld.helloWorld;
const World = djHelloWorld.World;
const Language = djHelloWorld.Language;

const newWorld = new World();
newWorld.sayHello();

newWorld.setLanguage(Language.Korean);
newWorld.sayHello();
```
Check the printed messages in the console.

## Demo
First clone the github repo:
```
git clone https://github.com/dakotaJang/dj-hello-world.git
```
Then install the dependencies:
```
npm i
```

Run ```npm start``` to run demos for both browser and the node.js:
```
npm start
```
Should see meaningful messages in the consoles.

### Start via node_modules
First install the dependencies:
```
npm i
```
Run the following command:
for browser:
```
npm run start:browser
```
for node:
```
npm run start:node
```
Should see meaningful messages in console.

### Start via local build
Create a build (for clean build, delete ```packages``` folder)
```
npm run build
```
Run the following command:
for browser:
```
npm run start:local:browser
```
for node:
```
npm run start:local:node
```
Should see meaningful messages in console.
