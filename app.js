const express = require("express");
require("dotenv").config();
const connectDB = require("./database/database");
const productrouter = require("./routes/productrouter");
const authrouter = require("./routes/authrouter");

PORT = process.env.PORT || 9009;

app = express();

connectDB();

app.use(express.json());

app.use("/api/v1/auth", authrouter);

app.get("/",(req, res) =>{
    res.status(200).json({
        success: true,
        message: "server is running"
    })
});

app.use("/auth/api", authrouter);

app.use("/auth/api", productrouter);


app.use((req, res) =>{
    res.status(404).json({
        success: false,
        message: "route not found"
    })
});


app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
});


