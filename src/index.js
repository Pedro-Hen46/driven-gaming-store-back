import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import chalk from "chalk";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js"
import OrdersRoute from "./routes/userOrdersRoute.js";

dotenv.config();
const server = express();

server.use(cors());
server.use(express.json());

server.use(userRouter);
server.use(OrdersRoute);
server.use(productRouter);


server.listen(process.env.PORT, () => {
  console.info(chalk.bold.green("Servidor aberto na porta.: ", process.env.PORT));
}); 