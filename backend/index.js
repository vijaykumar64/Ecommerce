// Packages
import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";  // Add CORS support

// Utils
import connectDB from "./config/db.js";
import userRouter from "./routes/userRouter.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

// Load environment variables
dotenv.config({ path: './config.env' });

const port = process.env.PORT || 5000;
const frontendURL = process.env.FRONTEND_URL || "http://localhost:5173";

// Connect to Database
connectDB(process.env.MONGO_URI);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ Enable CORS for both localhost (dev) and Netlify (production)
app.use(cors({
  origin: [frontendURL, "http://localhost:5173"],  // Allow multiple origins
  credentials: true,  // Allow cookies in requests
}));

// ✅ API Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/upload", uploadRoutes);
app.use("/api/v1/orders", orderRoutes);

// ✅ Serve Static Files (Cloudinary images do not need this, but keeping it for local fallback)
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Error Handling Middleware (optional, for debugging)
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

console.clear();
app.listen(port, () => console.log(`🚀 Server running on port: ${port}`));
