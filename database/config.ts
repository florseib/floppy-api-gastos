import mongoose from "mongoose";

export const conectarDB = async (): Promise<void> => {
    try {
        await mongoose.connect("mongodb+srv://seibertfloppy:v05qhEwVeYe1V5Xh@floppydb.moogchi.mongodb.net/");
        console.log()
    }
    catch (error) {
        console.log(error);
    }
}