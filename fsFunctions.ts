import fs from "fs";
import { IExpense } from "./interfaces";

export const getFromFile = (file: string): Promise<IExpense[]> => {
    return new Promise((resolve, reject) => {
        fs.readFile(`./files/${file}.json`, "utf8", (err, content) => {
            if (err) {
                reject(err);
            }
            resolve(JSON.parse(content))
        })
    })
}

export const saveToFile = (file: string, content: IExpense[]): Promise<void> => {

    return new Promise((resolve, reject) => {
        fs.writeFile(`./files/${file}.json`, JSON.stringify(content), (err) => {
            if (err) {
                reject(err)
            }
            resolve(console.log("Expensa guardada exitosamente"))
        })
    })
}