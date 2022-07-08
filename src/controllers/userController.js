import joi from "joi";
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import {db} from "../dbStategy/mongo.js";
import jwt from 'jsonwebtoken';

export async function createUser(req, res) {

    const { name, email, password } = req.body;
    const cryptoPassword = bcrypt.hashSync(password, 10);

    const userSchema = joi.object({
        name: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().required(),
    })

    const validate = userSchema.validate(req.body);
    if (validate.error) {
        console.log(validate.error.details);
        res.status(422).send("Favor preecher os campos corretamente");
        return;
    }

    try {
        const user = await db.collection("Users").find({ email }).toArray();

        if (user.some(e => e.email === req.body.email)) {
            res.status(409).send("user ja existe!");
            return;
        }
    } catch (error) {
        res.status(500).send("erro ao procurar user na database");
        return;
    }

    db.collection("Users").insertOne({
        name,
        email,
        password: cryptoPassword
    });

    res.sendStatus(201);
}

export async function loginUser(req, res) {
    const { email, password } = req.body;

    const userSchema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().required()
    });

    const { error } = userSchema.validate(req.body);

    if (error) {
        return res.sendStatus(422);
    }

    const user = await db.collection("Users").findOne({ email });

    if (user && bcrypt.compareSync(password, user.password)) {
        const chaveSecreta = process.env.JWT_SECRET;
        const configuracoes = { expiresIn: 60*60*24*30 } // 30 dias em segundos
        
        const token = jwt.sign({ id: user._id }, chaveSecreta, configuracoes);
        
        await db.collection("sessions").insertOne({
            userId: user._id,
            token
        })

        res.status(201).send({
            name: user.name,
            token
        });
    } else {
        res.status(401).send("senha ou email incorretos");
    }
}