import inquirer from "inquirer"
import { IExpense } from "./interfaces"

export const newExpensePrompt = async (): Promise<IExpense> => {
    return await inquirer.prompt([
        {
            type: "input",
            name: "detail",
            message: "En qué gastó?"
        },
        {
            type: "input",
            name: "expense",
            message: "Cuánto gastó?"
        }
    ])
}