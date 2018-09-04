var fs = require('fs');

readFile = (path) => {
  return new Promise((resolve,reject)=>
    {
      fs.readFile(path, 'utf8', function(err, contents) {
        if (err) reject(err);
        resolve(contents);
      });
    }
  )
}

openFile = (path) => {
  return new Promise((resolve,reject)=>{
    fs.open(path, 'w', (err, fd) => {
      if (err) throw err;
      resolve(fd);
    });
  })
}

writeFileDescriptor = (fd,data) => {
  return new Promise((resolve,reject)=>{
    fs.appendFile(fd, data, 'utf8', (err) => {
      if (err) throw err;
      resolve(fd);
    });
  })
}

closeFileDescriptor = (fd) => {
  fs.close(fd, (err) => {
    if (err) throw err;
  });
}

writeFile = (path, data)=>{
  openFile(path)
  .then(fd => writeFileDescriptor(fd,data))
  .then(fd => closeFileDescriptor(fd))
  .catch(err=>console.log(err));
}

filter_package_json = (data,filters) => {
  if(!filters || !filters.length){
    return Promise.resolve(data);
  } else {
    return new Promise((resolve,reject) => {
      let packageJson = JSON.parse(data);
      filters.forEach(key => {
        delete packageJson[key]
      });
      resolve(JSON.stringify(packageJson));
    });
  }
}

modify_package_json = (data,modifiers) => {
  if(!modifiers || !modifiers.length){
    return Promise.resolve(data);
  } else {
    return new Promise((resolve,reject) => {
      let packageJson = JSON.parse(data);
      modifiers.forEach(modifier => {
        if(typeof(modifier.action)==='string'){
          packageJson[modifier.key] = modifier.action;
        } else if(typeof(modifier.action)==='function') {
          packageJson[modifier.key] = modifier.action(packageJson[modifier.key]);
        }
      });
      resolve(JSON.stringify(packageJson));
    })
  }
}

copy_package_json = (src,dest,filters,modifiers) => {
  readFile(src)
  .then(data => filter_package_json(data,filters))
  .then(data => modify_package_json(data,modifiers))
  .then(data => writeFile(dest,data))
}

// filters by header labels (headers in the document will have to be unique or this will only remove the first occurrence)
filter_README_md = (data,filters) => {
  if(!filters || !filters.length){
    return Promise.resolve(data);
  } else {
    return new Promise((resolve,reject) => {
      filters.forEach(filter => {
        let startIndex = data.indexOf(`# ${filter}`);
        let headerType = 1;
        for (let i = 1; i < 6; i++) {
          if(data[startIndex-i] != '#'){
            headerType = i;
            break;
          }
        }
        startIndex -= headerType - 1;

        let endIndex = -1;
        for (let i = headerType; i > 1; i--) {
          endIndex = data.indexOf("#".repeat(i),startIndex+headerType);
          if(endIndex > -1) break;
        }
        if(endIndex === -1){
          data = data.slice(0,startIndex)
        }else{
          data = data.slice(0,startIndex) + data.slice(endIndex);
        }
      });
      resolve(data);
    });
  }
}

modify_README_md = (data,modifiers) => {
  if(!modifiers || !modifiers.length){
    return Promise.resolve(data);
  } else {
    return new Promise((resolve,reject) => {
      modifiers.forEach(modifier => {
        let regex = new RegExp(modifier.key,"g");
        data = data.replace(regex,modifier.action);
      });
      resolve(data);
    })
  }
}

copy_README_md = (src,dest,filters,modifiers) => {
  readFile(src)
  .then(data => filter_README_md(data,filters))
  .then(data => modify_README_md(data,modifiers))
  .then(data => writeFile(dest,data))
}

main = ()=>{
  let renameCjs = [
    {
      key:"name",
      action: 'dj-hello-world'
    }
  ];
  let renameES = [
    {
      key:"name",
      action: 'dj-hello-world-es'
    }
  ];
  let renameIFFE = [
    {
      key:"name",
      action: 'dj-hello-world-iife'
    }
  ];

  copy_package_json('package.json','packages/dj-hello-world/package.json',['scripts','devDependencies','dependencies'],renameCjs)
  copy_package_json('package.json','packages/dj-hello-world-es/package.json',['scripts','devDependencies','dependencies'],renameES)
  copy_package_json('package.json','packages/dj-hello-world-iife/package.json',['scripts','devDependencies','dependencies'],renameIFFE)

  let fillInPlaceholdersES = [
    {
      key:"# DJ Hello World",
      action: "# DJ Hello World - ES module"
    },
    {
      key:"{{module}}",
      action: "ES Module"
    },
    {
      key:"{{prefix}}",
      action: "-es"
    }
  ];

  let fillInPlaceholdersCjs = [
    {
      key:"{{module}}",
      action: "Common JS"
    },
    {
      key:"{{prefix}}",
      action: ""
    }
  ];

  let fillInPlaceholdersIife = [
    {
      key:"# DJ Hello World",
      action: "# DJ Hello World - IIFE"
    },
    {
      key:"{{module}}",
      action: "IIFE"
    },
    {
      key:"{{prefix}}",
      action: "-iife"
    }
  ];

  copy_README_md('templates/README.md','packages/dj-hello-world/README.md',["ES module","Via script tag"],fillInPlaceholdersCjs);
  copy_README_md('templates/README.md','packages/dj-hello-world-es/README.md',["Node","Via script tag"],fillInPlaceholdersES);
  copy_README_md('templates/README.md','packages/dj-hello-world-iife/README.md',["ES module","Node"],fillInPlaceholdersIife);
}
main();