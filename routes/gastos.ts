import { Request, Response, Router } from "express";
import Gasto, { IGasto } from "../models/gasto";
import Categoria from "../models/categoria";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
    const gastos = await Gasto.find().populate("categoria", "descripcion");

    res.json({
        gastos
    })
})

router.get("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    const mongoose = require('mongoose');

    if (mongoose.Types.ObjectId.isValid(id)) {
        const gasto = await Gasto.findById(id).populate("categoria", "descripcion");

        if (gasto)
            res.json({
                gasto
            })
        else
            res.json({
                msg: "Gasto no encontrado"
            })
    }
    else {
        res.json({
            msg: "ID inválido"
        })
    }
})

router.get("/GetByCategory/:categoria", async (req: Request, res: Response) => {
    const { categoria } = req.params;

    const categoriaObject = await Categoria.findOne({ descripcion: categoria.toUpperCase() });

    if (categoriaObject) {
        const gastos = await Gasto.find({ categoria: categoriaObject?._id }).populate("categoria", "descripcion")

        res.json({
            gastos
        })
    }
    else {
        res.json({
            msg: "No se encontraron gastos"
        })
    }
})

router.post("/", async (req: Request, res: Response) => {
    try {
        const { valor, descripcion, categoria } = req.body;

        let categoriaObject = await Categoria.findOne({ descripcion: categoria.toUpperCase() });

        console.log(categoriaObject)

        if (!categoriaObject) {
            categoriaObject = new Categoria({
                descripcion: categoria.toUpperCase()
            })

            categoriaObject.save();
        }

        const gasto = new Gasto({
            valor: valor,
            descripcion: descripcion,
            categoria: categoriaObject?._id,
        });

        await gasto.save();

        res.json({
            ...gasto, descripcion: categoriaObject.descripcion
        })
    }
    catch (error) {
        console.log(error)
    }
})

export default router;