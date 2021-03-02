const express = require("express");

const app = express();

app.get("/", (req, res) => res.send("backend running"));
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started at ${PORT}`));
