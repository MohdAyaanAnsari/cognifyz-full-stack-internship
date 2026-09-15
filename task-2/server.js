const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

const PORT = 3000;

// Path to users.json
const usersFile = path.join(__dirname, "users.json");

// Middleware
app.use(express.urlencoded({ extended: true }));

// Serve frontend
app.use(express.static(path.join(__dirname, "public")));

// POST /register
app.post("/register", (req, res) => {

    const {
        name,
        email,
        password,
        age,
        gender,
        skills,
        terms
    } = req.body;

    // =========================
    // SERVER-SIDE VALIDATION
    // =========================

    if (!name || name.trim().length < 3) {
        return res.status(400).send("Invalid name.");
    }

    if (!email || !email.includes("@")) {
        return res.status(400).send("Invalid email.");
    }

    if (!password || password.length < 6) {
        return res.status(400).send(
            "Password must contain at least 6 characters."
        );
    }

    const userAge = Number(age);

    if (
        !Number.isInteger(userAge) ||
        userAge < 18 ||
        userAge > 100
    ) {
        return res.status(400).send("Invalid age.");
    }

    if (!["male", "female", "other"].includes(gender)) {
        return res.status(400).send("Invalid gender.");
    }

    if (!terms) {
        return res.status(400).send(
            "You must accept the terms and conditions."
        );
    }

    // =========================
    // READ EXISTING USERS
    // =========================

    let users = [];

    try {

        const data = fs.readFileSync(usersFile, "utf-8");

        users = JSON.parse(data);

        // Make sure JSON contains an array
        if (!Array.isArray(users)) {
            users = [];
        }

    } catch (error) {

        // If file doesn't exist or is invalid,
        // start with an empty array

        users = [];
    }

    // =========================
    // CREATE NEW USER
    // =========================

    const newUser = {
        id: users.length + 1,
        name: name.trim(),
        email: email.trim(),
        age: userAge,
        gender: gender,
        skills: Array.isArray(skills)
            ? skills
            : skills
                ? [skills]
                : []
    };

    // =========================
    // ADD USER TO ARRAY
    // =========================

    users.push(newUser);

    // =========================
    // WRITE UPDATED DATA
    // =========================

    try {

        fs.writeFileSync(
            usersFile,
            JSON.stringify(users, null, 4)
        );

    } catch (error) {

        console.error(error);

        return res.status(500).send(
            "Unable to save user data."
        );
    }

    // =========================
    // SUCCESS RESPONSE
    // =========================

    res.send(`
        <div style="
            font-family: Arial;
            text-align: center;
            margin-top: 100px;
        ">

            <h1 style="color: green;">
                Registration Successful!
            </h1>

            <p>
                Welcome, ${newUser.name}
            </p>

            <p>
                Your validated data has been saved
                to the server.
            </p>

            <a href="/" style="
                display: inline-block;
                margin-top: 20px;
                padding: 10px 20px;
                background: #007bff;
                color: white;
                text-decoration: none;
                border-radius: 5px;
            ">
                Register Another User
            </a>

        </div>
    `);
});

// Start server
app.listen(PORT, () => {
    console.log(
        `Server running at http://localhost:${PORT}`
    );
});