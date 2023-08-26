import express, {Express} from "express";
import { conectarDB } from "../database/config";
import gastosRoutes from "../routes/gastos"


export class Server {
    app: Express;

    constructor() {
        this.app = express();
        this.conectarABase();
        this.middlewares();
        this.routes();
    }

    async conectarABase(): Promise<void> {
        await conectarDB();
    }

    middlewares(): void {
        this.app.use(express.json());
    }

    routes(): void {
        this.app.use("/gastos", gastosRoutes);
    }

    listen(): void {
        this.app.listen(8080, () => {
            console.log("Corriendo");
        })
    }
}