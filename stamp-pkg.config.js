module.exports = [
  {
    package_src:"package.json",
    package_dest:"packages/dj-hello-world/package.json",
    package_ignore:[
      "scripts","devDependencies"
    ],
    package_redefine:[
      {
        key:"name",
        value: "dj-hello-world"
      }
    ],
    readme_src: "templates/README.md",
    readme_dest: "packages/dj-hello-world/README.md",
    readme_placeholder_values:[
      {
        key:"{{module}}",
        value: "UMD and ES modules"
      },
      {
        key:"{{prefix}}",
        value: ""
      },
      {
        key:"{{file-prefix}}",
        value: ".esm"
      },
      {
        key:"{{version}}",
        package: "version"
      },
    ],
  },
  {
    package_src:"package.json",
    package_dest:"packages/dj-hello-world-es/package.json",
    package_ignore:[
      "scripts","devDependencies"
    ],
    package_redefine:[
      {
        key:"name",
        value: "dj-hello-world-es"
      },
      {
        key: "module",
        value: "index.js"
      }
    ],
    readme_src: "templates/README.md",
    readme_dest: "packages/dj-hello-world-es/README.md",
    readme_ignore: [
      "Node","Via script tag"
    ],
    readme_placeholder_values:[
      {
        key:"# DJ Hello World",
        value: "# DJ Hello World - ES module"
      },
      {
        key:"{{module}}",
        value: "ES Module"
      },
      {
        key:"{{prefix}}",
        value: "-es"
      },
      {
        key:"{{file-prefix}}",
        value: ""
      }
    ]
  },
]