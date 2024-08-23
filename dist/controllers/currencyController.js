"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertCurrency = exports.getCurrencies = void 0;
const axios_1 = __importDefault(require("axios"));
const index_1 = require("../dto/index"); // Ensure the correct import path
const getCurrencies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const apiKey = process.env.API_KEY;
        if (!apiKey) {
            throw new Error('API key is missing');
        }
        const response = yield axios_1.default.get(`https://api.freecurrencyapi.com/v1/latest?apikey=${apiKey}`);
        // Send a successful response using ApiResponse
        res.status(200).json(new index_1.ApiResponse(true, response.data, 'Currencies fetched successfully', 200));
    }
    catch (error) {
        let errorMessage = 'An unknown error occurred';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        // Send an error response using ApiResponse
        res.status(500).json(new index_1.ApiResponse(false, null, errorMessage, 500));
    }
});
exports.getCurrencies = getCurrencies;
const convertCurrency = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { amount, from, to } = req.body;
        if (!amount || !from || !to) {
            throw new Error('Amount, From, and To fields are required');
        }
        const apiKey = process.env.API_KEY;
        if (!apiKey) {
            throw new Error('API key is missing');
        }
        // Fetching the conversion rate
        const response = yield axios_1.default.get(`https://api.freecurrencyapi.com/v1/latest?apikey=${apiKey}&base_currency=${from}`);
        const rates = response.data.data;
        const conversionRate = rates[to];
        if (!conversionRate) {
            throw new Error(`Conversion rate from ${from} to ${to} not found`);
        }
        // Calculating the converted amount
        const convertedAmount = amount * conversionRate;
        // Creating the response object
        const result = {
            amount: amount,
            convertedAmount: convertedAmount,
            from: from,
            to: to,
            date: new Date().toISOString()
        };
        // Sending the successful response using ApiResponse
        res.status(200).json(new index_1.ApiResponse(true, result, 'Currency converted successfully', 200));
    }
    catch (error) {
        let errorMessage = 'An unknown error occurred';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        // Sending the error response using ApiResponse
        res.status(500).json(new index_1.ApiResponse(false, null, errorMessage, 500));
    }
});
exports.convertCurrency = convertCurrency;
