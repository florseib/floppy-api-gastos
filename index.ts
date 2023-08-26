import inquirer from "inquirer";
import { getFromFile, saveToFile } from "./fsFunctions";
import { newExpensePrompt } from "./prompts";

const main = async () => {

    let run = true;

    while (run) {
        const action = await inquirer.prompt([
            {
                type: "list",
                name: "expenses",
                message: "Seleccione una acción:",
                choices: [
                    {
                        value: 1,
                        name: "Agregar gasto"
                    },
                    {
                        value: 2,
                        name: "Ver gastos"
                    },
                    {
                        value: 0,
                        name: "SALIR"
                    },
                ]
            }
        ])

        switch (action.expenses) {
            case 1:
                await addExpense();
                break;
            case 2:
                await getExpenses();
                break;
            case 0:
                run = false;
                break;
            default:
                run = false;
                break
        }
    }
};

main()

async function getExpenses() {
    const expenses = await getFromFile("expenses");
    let i = 1;
    expenses.forEach(expense => {
        console.log(`${i}. ${expense.detail}: $${expense.expense}`)
        i++;
    });
}

async function addExpense() {
    const newExpense = await newExpensePrompt();
    const expenses = await getFromFile("expenses");
    expenses.push(newExpense);
    await saveToFile("expenses", expenses)
}