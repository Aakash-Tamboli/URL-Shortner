import express from "express";
import dotEnv from "dotenv";
import cors from "cors";
import connectDB from "./config/dbConfig";
import shortUrl from "./routes/shortUrl";

dotEnv.config();

connectDB();

const PORT = process.env.PORT || 5001;

const app = express();
// middlewares set up
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// mimic shortUrl exporting const shortUrl = router
app.use("/api/", shortUrl); // router we created

// middlewares setup ends

app.get("/", (request, response) => {
  response.send("God is always Great");
});

app.listen(PORT, () => {
  console.log(`HTTP Server is listening at ${PORT}...`);
});
// server.ts ends
