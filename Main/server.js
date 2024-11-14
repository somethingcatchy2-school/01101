const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const port = 3000;

// Middleware to parse POST data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve your static HTML file (make sure your HTML is in the same directory as server.js)
app.use(express.static("public"));

// Handle form submission
app.post("/submit", (req, res) => {
  const formData = req.body;

  // Save the data to a file (you could also save it to a database)
  fs.appendFile("formData.txt", JSON.stringify(formData) + "\n", (err) => {
    if (err) {
      console.error("Error saving data", err);
      return res.status(500).send("Internal Server Error");
    }

    res.send("Form submitted successfully!");
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
