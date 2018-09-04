# DJ Hello World
Simple demonstration of packaging for {{module}} using single project.

## Description
This project attempts to use one source code to distribute multiple packages.
This project is compiled for {{module}}. For more detail check the <a href="https://github.com/dakotaJang/dj-hello-world">github repo</a>.

## Using the Package
Before anything we should install the dependencies:
```
npm i dj-hello-world{{prefix}}
```

### Via script tag
Write a html file importing the script.
```html
<script src="node_modules/dj-hello-world-iife/index.js"></script>
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
import { World, Language } from "node_modules/dj-hello-world-es/index.js";

const newWorld = new World();
newWorld.sayHello();

newWorld.setLanguage(Language.Chinese);
newWorld.sayHello();
```
Check the printed messages in the console from browser's Developer Tools tab.

### Node
Node.js uses CommonJS for managing packages. Meaning it uses the ```require``` function to import the packages. Run the following script in node.js.
```js
const djHelloWorld = require("dj-hello-world");
const helloWorld = djHelloWorld.helloWorld;
const World = djHelloWorld.World;
const Language = djHelloWorld.Language;

const newWorld = new World();
newWorld.sayHello();

newWorld.setLanguage(Language.Chinese);
newWorld.sayHello();
```
Check the printed messages in the console.
