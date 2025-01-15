import prisma from '../prismaClient.js'
import express from 'express';


const router = express.Router();

router.post('/save', async (req, res) => {
    try {
        const {date, expenses, amount, budget_balance} = req.body;
        const tbl = await prisma.monthly_chart_data.create({
            data: {
                date,
                expenses,
                amount,
                budget_balance
            },
        });
        res.sendStatus(201).json({message: "Data saved", data: tbl});
    }
    catch (err) {
        console.error(err.message);
        res.sendStatus(500);
    }
})

export default router;