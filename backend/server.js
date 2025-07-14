const express = require("express");
const connectDatabase = require("./config/db");
const { productRouter } = require("./routes/product.route");
const { userRoute } = require("./routes/user.route");
const { addressRoute } = require("./routes/address.route");
const { cartRoute } = require("./routes/cart.route");
const { orderRoute } = require("./routes/order.route");
const { adminRoute } = require("./routes/admin.route");

require("dotenv").config();
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8001;


app.use(cors());
app.use(express.json());


app.use("/user", userRoute);
app.use("/product", productRouter);
app.use("/address", addressRoute);
app.use("/cart", cartRoute);
app.use("/order", orderRoute);
app.use("/admin", adminRoute);

connectDatabase()
  .then(() => {
    console.log(" MongoDB Connected");

    app.listen(PORT, () => {
      console.log(` Server started on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(" MongoDB Connection Failed:", err.message);
    process.exit(1); 
  });
