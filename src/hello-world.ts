import { Language } from "./language";
import { default as values } from "lodash-es/values";

let helloWorld = function() {
  return 'Hello World!';
}

class World {
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
  supportedLanguages() {
    const languages = values(Language).filter(x => typeof (x) === "string");
    console.log("Supported languages: ", languages);
    return languages;
  }
}

export { helloWorld, World }
