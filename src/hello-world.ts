import { Language } from "./language";

let helloWorld = function() {
  return 'Hello World!';
}

export {helloWorld}
export class World {
  constructor(){
      console.log(`
      Created new World
      `);
  }
  private language: Language;
  sayHello(){
      let phrase = 'Hello World!'
      switch (this.language) {
          case Language.Chinese:
              phrase = "你好，世界"
              break;
          case Language.Korean:
              phrase = "안녕 세상!"
              break;
          case Language.Spanish:
              phrase = "¡Hola Mundo!"
              break;
          case Language.English:
          default:
              phrase = "Hello World!"
              break;
      }
      console.log(phrase)
      return phrase;
  }
  setLanguage(lang: Language){
      this.language = lang;
  }
}
