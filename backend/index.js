import "dotenv/config";
import express from "express";

const app = express();
const PORT = process.env.PORT || 8081;

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to Skillync API",
    });
});

app.listen(PORT, () => {
    console.log(`Skillync server running on port ${PORT}`);
});