import joi from "joi";
import { db } from "../dbStategy/mongo.js";

async function addOrder(req, res) {
  const MyOrder = req.body;
  const orderSchema = joi.object({
    endereco: joi.string().required(),
    email: joi.string().email().required(),
    district: joi.string().required(),
    cep: joi.string().required(),
    date: joi.string().required(),
    payment: joi.string().required(),
    phoneContact: joi.string().required(),
    reference: joi.string(),
    products: joi.array(),
    valueOrder: joi.string().required(),
  });
  const validate = orderSchema.validate(MyOrder);
  if (validate.error) {
    console.log(validate.error.details);
    res.status(422).send("Favor preencher os campos corretamente");
    return;
  }
  await db.collection("orders").insertOne(MyOrder);
  res.status(200).send("Compra realizada com sucesso!");
}

async function getOrders(req, res) {
  const user = req.headers;

  const dataBaseOrders = await db
    .collection("orders")
    .find({ email: { $eq: user.email } })
    .toArray();
  if (dataBaseOrders !== null) {
    return res.status(200).send(dataBaseOrders);
  }
  return res.status(404).send("Não encontrei nenhum pedido neste email");

}
export { addOrder, getOrders };
