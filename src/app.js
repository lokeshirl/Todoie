import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import todoRouter from "./routes/todo.routes.js";
import userRouter from "./routes/user.routes.js";

dotenv.config({
  path: "./.env",
});
const app = express();

/**
 * required middlewares
 * for json and body parsing
 */
app.use(express.json()); // json parser
app.use(express.urlencoded({ extended: false })); // body parsing

// api routes
app.use("/api/todos", todoRouter);
app.use("/api/users", userRouter);

/**
 * DB connection and server instance
 */
const startServer = () => {
  app.listen(process.env.PORT || 8080, () => {
    console.log(`⚙️  Server is running on port :: ${process.env.PORT || 8080}`);
  });
};

try {
  await connectDB();
  startServer();
} catch (error) {
  console.log("MongoDB connection error: ", error);
}
