import prisma from '../prismaClient.js'
import express from 'express';


const router = express.Router();

router.post('/save', async (req, res) => {
    try {
        let {date, expenses, amount, budget_balance} = req.body;
        date = new Date(date).toISOString();
        const tbl = await prisma.monthly_chart_data.create({
            data: {
                date: date,
                expenses: expenses,
                amount: amount,
                budget_balance: budget_balance
            },
        });
        res.status(201).json({ message: "Data saved", data: tbl });
    }
    catch (err) {
        console.error(err.message);
        res.sendStatus(500);
    }
})

router.get('/data', async (req, res) => {
    try {
        const data = await prisma.monthly_chart_data.findMany();
        res.json(data);
    } catch (err) {
        console.error(err.message);
        res.sendStatus(500);
    }
});

router.get('/test', async (req, res) => {
    try {
        const result = await prisma.monthly_chart_data.findMany();
        console.log(result); // Logs to the terminal
        res.status(200).json(result); // Returns the data as a response
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Failed to retrieve data' });
    }
});


export default router;