// packages
import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors"; // Import cors package

// Utils
import connectDB from "./config/db.js";
import userRouter from "./routes/userRouter.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config({ path: "./config.env" });
const port = process.env.PORT || 5000;

connectDB(process.env.MONGO_URI);

const app = express();

// Enable CORS
app.use(
  cors({
    origin: "https://splendid-sorbet-c54a6b.netlify.app", // Replace with your Netlify URL
    methods: "GET, POST, PUT, DELETE",
    credentials: true, // Allow cookies if needed
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/upload", uploadRoutes);
app.use("/api/v1/orders", orderRoutes);

// Serve static files
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

console.clear();

app.listen(port, () => console.log(`Server running on port: ${port}`));
