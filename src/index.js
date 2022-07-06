import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import chalk from "chalk";

dotenv.config();

const server = express();

server.use(cors());
server.use(express.json());

server.get('/teste', (req, res) => {
    res.status(200).send('Blz meu parceiro, deu sucesso na requisição...');
})



server.listen(process.env.PORT, () => {
  console.info(chalk.bold.green("Servidor aberto na porta.: ", process.env.PORT));
});