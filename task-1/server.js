const express = require("express");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// EJS setup
app.set("view engine", "ejs");

// Home page
app.get("/", (req, res) => {
    res.render("index");
});

// Handle form submission
app.post("/submit", (req, res) => {
    const { name, email } = req.body;

    res.render("result", {
        name,
        email
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});