
import { db } from "../dbStategy/mongo.js";

export async function getProduct(req, res) {
    const products = await db.collection("product").find().toArray();
    res.status(200).send(products);
}

export async function getProductDetails(req, res) {
    const idProduct = req.body.product;

    const productSelected = await db.collection("product").find({_id: idProduct}).toArray();

    res.status(200).send('Deu bom meu querido toma o array', productSelected);
}