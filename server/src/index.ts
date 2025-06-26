import cors from "cors";
import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import userRouter from "./user-api/routes";

// Load environment variables from .env file
dotenv.config();

const app: Application = express();
const PORT: number = parseInt(process.env.PORT || "3000", 10);

app.use(cors()); // Allow all CORS requests (for development)
// Or configure specific origins:
// app.use(cors({ origin: 'http://localhost:4200' }));

// Middleware
app.use(express.json()); // Enable JSON body parsing

// Basic route
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the TypeScript Express REST API!");
});

// User routes
app.use("/api/users", userRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Access at http://localhost:${PORT}`);
});
