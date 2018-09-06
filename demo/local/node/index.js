const djHelloWorld = require("../../../packages/dj-hello-world");
const helloWorld = djHelloWorld.helloWorld;
const World = djHelloWorld.World;
const Language = djHelloWorld.Language;

console.log(helloWorld());

const newWorld = new World();
newWorld.sayHello();

newWorld.setLanguage(Language.Chinese);
newWorld.sayHello();

newWorld.setLanguage(Language.Korean);
newWorld.sayHello();

newWorld.setLanguage(Language.Spanish);
newWorld.sayHello();

newWorld.supportedLanguages();
