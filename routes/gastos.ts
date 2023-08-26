import { Request, Response, Router } from "express";
import Gasto, { IGasto } from "../models/gasto";

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
    const gastoData: IGasto = req.body;

    const gasto = new Gasto(gastoData);

    await gasto.save();

    res.json({
        gasto
    })
})

export default router;