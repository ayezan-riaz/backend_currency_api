import { Request, Response } from 'express';
import axios from 'axios';
import { ApiResponse } from '../dto/index';  // Ensure the correct import path

export const getCurrencies = async (req: Request, res: Response): Promise<void> => {
    try {
        const apiKey = process.env.API_KEY;
        if (!apiKey) {
            throw new Error('API key is missing');
        }

        const response = await axios.get(`https://api.freecurrencyapi.com/v1/latest?apikey=${apiKey}`);
        
        // Send a successful response using ApiResponse
        res.status(200).json(new ApiResponse(true, response.data, 'Currencies fetched successfully', 200));
    } catch (error) {
        let errorMessage = 'An unknown error occurred';

        if (error instanceof Error) {
            errorMessage = error.message;
        }

        // Send an error response using ApiResponse
        res.status(500).json(new ApiResponse(false, null, errorMessage, 500));
    }
};

export const convertCurrency = async (req: Request, res: Response): Promise<void> => {
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
        const response = await axios.get(`https://api.freecurrencyapi.com/v1/latest?apikey=${apiKey}&base_currency=${from}`);

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
        res.status(200).json(new ApiResponse(true, result, 'Currency converted successfully', 200));
    } catch (error) {
        let errorMessage = 'An unknown error occurred';

        if (error instanceof Error) {
            errorMessage = error.message;
        }

        // Sending the error response using ApiResponse
        res.status(500).json(new ApiResponse(false, null, errorMessage, 500));
    }
};