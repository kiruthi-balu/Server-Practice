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
  } else if (req.url === "/adddata" && req.method === "POST"){
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      try {
        const newProduct = JSON.parse(body);
        fs.readFile("./productdata.json", "utf8", (error, data) => {
          if (error) {
            res.writeHead(500, { "Content-Type": "text/plain" });
            console.error(error);
            res.end("Error reading product data");
          } else {
            const products = JSON.parse(data);
            products.push(newProduct);

            fs.writeFile("./productdata.json", JSON.stringify(products, null, 2), (err) => {
              if (err) {
                res.writeHead(500, { "Content-Type": "text/plain" });
                console.error(err);
                res.end("Error saving product data");
              } else {
                res.writeHead(201, { "Content-Type": "application/json" });
                res.end(JSON.stringify(products, null, 2));
              }
            });
          }
        });
      } catch (parseError) {
        res.writeHead(400, { "Content-Type": "text/plain" });
        console.error(parseError);
        res.end("Invalid JSON data");
      }
    });

  }
   else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Nothing is happening, TRY AGAIN!!!");
  }
});

// Start the server
practice.listen(4512, () => {
  console.log("Shopping app running on http://localhost:4512");
});
