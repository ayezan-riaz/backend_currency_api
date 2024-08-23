// import express, { Application } from 'express';
// import dotenv from 'dotenv';
// import cors from 'cors'; // Ensure this is correctly imported
// import { router as currencyRoutes } from './routes/currencyRoutes';

// dotenv.config();

// const app: Application = express();
// const port = process.env.PORT || 3000;

//  app.use(cors()); // Now cors should work without issues
// app.use(express.json());
// app.use('/api', currencyRoutes);

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });

import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { router as currencyRoutes } from './routes/currencyRoutes';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: 'http://localhost:4200',
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
}));

app.use(express.json());
app.use('/api', currencyRoutes);
app.get('/', (req, res) => {
  res.redirect('/api/currencies');
});
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
