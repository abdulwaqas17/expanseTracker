let express = require('express');
let app = express();
require('dotenv').config();
let connectDB = require('./config/db');
let authRoutes = require('./routes/authRoutes');
let userRoutes = require('./routes/userRoutes');
let expenseRoutes = require('./routes/expenseRoutes');
let incomeRoutes = require('./routes/incomeRoutes');

let cors = require('cors');

app.use(express.json()); 


const corsOptions = {
  origin: 'http://localhost:3000'
};

app.use(cors(corsOptions));

// to connect mongo db
connectDB();


// Routes
app.use('/', authRoutes);
app.use('/', userRoutes);
app.use('/', expenseRoutes);
app.use('/', incomeRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> console.log('server is running on port',PORT));