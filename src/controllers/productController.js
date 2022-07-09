
import { db , ObjectId } from "../dbStategy/mongo.js";

export async function getProduct(req, res) {
    const products = await db.collection("product").find().toArray();
    res.status(200).send(products);
}

export async function getProductDetails(req, res) {
    const { id } = req.body;
    const objectId = ObjectId;
    const productSelected = await db.collection("product").find({ _id: new ObjectId(id)}).toArray();

    res.status(200).send(productSelected);
}