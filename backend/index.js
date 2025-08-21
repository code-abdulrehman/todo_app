import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import sequelize from "./app/config/db.js";
import todoRoutes from "./app/routes/todo.route.js";

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/todos", todoRoutes);

sequelize.sync().then(() => {
  console.log("Postgres connected & models synced");
  app.listen(process.env.PORT, () =>
    console.log(`🚀 Server running on port ${process.env.PORT}`)
  );
});
