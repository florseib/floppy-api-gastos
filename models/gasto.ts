import { Model, Schema, model } from "mongoose";
import Categoria from "./categoria"

export interface IGasto {
    valor: number;
    descripcion: string;
    // categoria: Categoria;
    // fechaCarga: 
}

const GastoSchema = new Schema<IGasto>({
    descripcion: {
        type: String,
        required: true,
    },
    valor: {
        type: Number,
        required: true,
    },
});

const Gasto: Model<IGasto> = model<IGasto>("Gasto", GastoSchema);

export default Gasto;