import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("HOME DEL SERVER");
});

const port = process.env.PORT || 5000;
app.listen(port, function () {
    console.log(`El server esta en el puerto ${port}`)
})