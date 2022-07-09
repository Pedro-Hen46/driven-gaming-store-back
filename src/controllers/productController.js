import { db } from "../dbStategy/mongo.js";


export async function getProduct(req, res) {
    const products = await db.collection("product").find().toArray();
    res.status(200).send(products);
}

export async function addProductCart(req, res) {
    
    
    const products = await db.collection("product").find().toArray();
    res.status(200).send(products);
}
