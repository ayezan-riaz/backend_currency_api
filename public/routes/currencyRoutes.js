"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const currencyController_1 = require("../controllers/currencyController");
let router = (0, express_1.Router)();
exports.router = router;
router.get('/currencies', currencyController_1.getCurrencies);
router.post('/convert', currencyController_1.convertCurrency);
