import express from 'express';
import cors from "cors";
import dotenv from "dotenv";

const app = express();
dotenv.config();
app.use(cors());


// ============ routes ===========

app.get('/hello', (req, res) => {
    res.send('Hello World!');
});

// ===============================


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
