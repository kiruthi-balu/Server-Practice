const http = require("http");
const fs = require("fs");
const { error } = require("console");

const practice = http.createServer((req, res) => {
  if (req.url === "/home") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Shopping for men and women");
  } else if (req.url === "/Cart") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Shopping cart for men and women");
  } else if (req.url === "/product") {
    fs.readFile("./productdata.json", "utf8", (error, data) => {
      if (error) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        console.error(error);
        res.end("Error reading product data");
      } else {
        try {
          const dress = JSON.parse(data);
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(dress, null, 2));
        } catch (parseError) {
          res.writeHead(500, { "Content-Type": "text/plain" });
          console.error(parseError);
          res.end("Error parsing product data");
        }
      }
    });
  } else if (req.url === "/adddata") {
    fs.readFile("./productdata.json", "utf8", (error, data) => {
      if (error) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        console.error(error);
        res.end("Error adding product data");
      } else {
        try {
          let ip = { Name: "Palazzo", Price: "Rs.220", Brand: "KALAIMANDHIR" };
          let old = JSON.parse(data);
          old.push(ip);
          // res.write(JSON.stringify(data));  doubt
          res.end(JSON.stringify(old, null, 2));

          // res.end();
        } catch (parseError) {
          res.writeHead(500, { "Content-Type": "text/plain" });
          console.error(parseError);
          res.end("Error parsing product data");
        }
      }
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Nothing is happening, TRY AGAIN!!!");
  }
});

// Start the server
practice.listen(4512, () => {
  console.log("Shopping app running on http://localhost:4512");
});
