import express from 'express'
import path, {dirname} from 'path';
import { fileURLToPath } from 'url';
import rawDataRoutes from './routes/rawDataRoutes.js';

const app = express();
const PORT = 5000;

const __dirname = 'C:\\Users\\ariac\\Repos\\FinanceTracker';

// static files. add to include styling
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); // middleware to parse json

// serve html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});



app.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
});