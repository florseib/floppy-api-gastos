import { Request, Response, Router } from "express";
import Gasto, { IGasto } from "../models/gasto";
import Categoria from "../models/categoria";

const router = Router();

router.get("/", async(req: Request, res: Response) => {
    const gastos = await Gasto.find();

    res.json({
        msg: "Todo ok",
        gastos
    })
})

router.get("/:id", async(req: Request, res: Response) => {
    const {id} = req.params;

    const gasto = await Gasto.findById(id);

    res.json({
        msg: "Get by Id",
        gasto
    })
})

router.post("/", async(req: Request, res: Response) => {
    const {valor, descripcion, categoria} = req.body;

    let categoriaObject = await Categoria.findOne({descripcion: categoria.toUpperCase()});

    console.log(categoriaObject)

    if(!categoriaObject) {
        categoriaObject = new Categoria({
            descripcion: categoria.toUpperCase()
        })

        categoriaObject.save();
    }

    const gasto = new Gasto({
        valor: valor,
        descripcion: descripcion,
        categoriaId: categoriaObject?._id,
    });

    await gasto.save();

    res.json({
        gasto
    })
})

export default router;