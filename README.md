# DEV-Playground
A simple way to have a playground to test Javascript, SASS and HTML.

## Instalation
```
$ npm install
$ bower install
````

## Starting playground
```
$ gulp start
```

# How to use it?
Playground is made to have an auto injectable dependency files. 
As an example to create a "example" view first we need to create the next files 
```
app/src/html/example.html
app/src/sass/example.scss
app/src/js/example.js
```

## Access to file
When we create an html file we can access to it by passing the ?file= param in the URL: http://localhost:8080/?file=example

## SASS
When the HTML injected the file name is added as an ID to the body. This is made to prevent CSS from a file overwrite some code from another file. So the SCSS file from __example.scss__ should look like:
```
#example {
  h1 {
    font-weight: 300;
    text-align: center;
  }
  p {
    text-align: justify;
  }
}
```

## JS
The file __app.js__ has an object of functions (for now only an empty init function) we can attach more functions from another files.

The idea is that append a function with the same name as the file to auto execute that function at the loading of the screen. The file __example.js__ would look like that:

```
app.example = function () {
    console.log('example JS');
};
```
