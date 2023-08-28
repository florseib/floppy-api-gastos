import { Model, Schema, model } from "mongoose";

export interface ICategoria {
    descripcion: string;
    // fechaCarga: 
}

const CategoriaSchema = new Schema<ICategoria>({
    descripcion: {
        type: String,
        required: true,
        unique: true,
    },
});

const Categoria: Model<ICategoria> = model<ICategoria>("Categoria", CategoriaSchema);

export default Categoria;