const express = require("express");
const cors = require("cors");
const fs = require("fs").promises;
const path = require("path");

const app = express();
const PORT = 5000;
const usersFilePath = path.join(__dirname, "src", "data", "usersData.json");

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

const ensureUsersFile = async () => {
    try {
        await fs.access(usersFilePath);
    } catch {
        await fs.mkdir(path.dirname(usersFilePath), { recursive: true });
        await fs.writeFile(usersFilePath, "[]", "utf8");
    }
};

const readUsers = async () => {
    await ensureUsersFile();
    const data = await fs.readFile(usersFilePath, "utf8");

    try {
        return JSON.parse(data || "[]");
    } catch {
        return [];
    }
};

const writeUsers = async (users) => {
    await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), "utf8");
};

app.post("/api/auth/signup", async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: "Username, email, and password are required." });
    }

    try {
        const users = await readUsers();
        const normalizedUsername = username.trim().toLowerCase();
        const normalizedEmail = email.trim().toLowerCase();

        const existingUser = users.find(
            (user) =>
                user.username.toLowerCase() === normalizedUsername ||
                user.email.toLowerCase() === normalizedEmail
        );

        if (existingUser) {
            return res.status(409).json({ message: "Username or email already exists." });
        }

        const newUser = {
            id: Date.now().toString(),
            username: username.trim(),
            email: email.trim(),
            password,
            createdAt: new Date().toISOString(),
        };

        users.push(newUser);
        await writeUsers(users);

        return res.status(201).json({
            message: "Account created successfully.",
            user: {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email,
            },
        });
    } catch (error) {
        return res.status(500).json({ message: "Could not create account." });
    }
});

app.post("/api/auth/login", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required." });
    }

    try {
        const users = await readUsers();
        const user = users.find(
            (item) => item.username.toLowerCase() === username.trim().toLowerCase()
        );

        if (!user || user.password !== password) {
            return res.status(401).json({ message: "Invalid username or password." });
        }

        return res.status(200).json({
            message: "Login successful.",
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
            },
        });
    } catch (error) {
        return res.status(500).json({ message: "Could not login." });
    }
});

app.listen(PORT, () => {
    console.log(`Auth API running on http://localhost:${PORT}`);
});
