import { Router } from 'express';
import { getCurrencies,convertCurrency  } from '../controllers/currencyController';

let router = Router();

router.get('/currencies', getCurrencies);
router.post('/convert', convertCurrency);
export {router};