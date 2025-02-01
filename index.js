let myserver = require("http");
let read = require("fs");
// let mydata = require("data.json");

let myapp = myserver.createServer((request, response) => {
  if (request.url == "/") {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.write("This is my first server");
    response.end();
  } else if (request.url == "/home") {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.write("This is my first server home page");
    response.end();
  } else if (request.url == "/reading") {
    read.readFile("./data.json", "utf8", (errors, mydata) => {
      if (errors) {
        response.write("This file can't read");
        console.log(errors);
        response.end();
      } else {
        const data = JSON.parse(mydata);
        response.write(JSON.stringify(data));
        response.end();
      }
    });
  } else if (request.url == "/read") {
    read.readFile("./book.txt", "utf8", (error, reading) => {
      if (error) {
        response.write("Cannot read the content");
        response.end();
      } else {
        response.write(reading);
        response.end();
      }
    });
  } else {
    response.write("This is my server");
    response.end();
  }
});

myapp.listen(5000, () => {
  console.log("server running");
});
