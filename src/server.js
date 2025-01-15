import express from 'express'
import path, {dirname} from 'path';
import { fileURLToPath } from 'url';
import rawDataRoutes from './routes/rawDataRoutes.js';

const app = express();
const PORT = 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// static files. add to include styling
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json()); // middleware to parse json

// serve html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});


app.use('/api', rawDataRoutes);

app.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
});