'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating a business forecast based on revenue and expense data.
 *
 * It includes:
 * - `generateBusinessForecast`: A function that takes revenue and expense data as input and returns a business forecast.
 * - `BusinessForecastInput`: The input type for the `generateBusinessForecast` function.
 * - `BusinessForecastOutput`: The output type for the `generateBusinessForecast` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const BusinessForecastInputSchema = z.object({
  revenueData: z.string().describe('Historical revenue data, comma separated'),
  expenseData: z.string().describe('Historical expense data, comma separated'),
  marketConditions: z.string().optional().describe('Optional: Current market conditions description.'),
});
export type BusinessForecastInput = z.infer<typeof BusinessForecastInputSchema>;

const BusinessForecastOutputSchema = z.object({
  forecastSummary: z.string().describe('A summary of the business forecast, including anticipated market conditions and recommended actions.'),
});
export type BusinessForecastOutput = z.infer<typeof BusinessForecastOutputSchema>;

export async function generateBusinessForecast(input: BusinessForecastInput): Promise<BusinessForecastOutput> {
  return generateBusinessForecastFlow(input);
}

const prompt = ai.definePrompt({
  name: 'businessForecastPrompt',
  input: {schema: BusinessForecastInputSchema},
  output: {schema: BusinessForecastOutputSchema},
  prompt: `You are an expert business analyst. Based on the provided revenue and expense data, and considering current market conditions, generate a business forecast. Include anticipated market conditions and recommended actions.

Revenue Data: {{{revenueData}}}
Expense Data: {{{expenseData}}}
Market Conditions: {{{marketConditions}}}

Forecast Summary:`, 
});

const generateBusinessForecastFlow = ai.defineFlow(
  {
    name: 'generateBusinessForecastFlow',
    inputSchema: BusinessForecastInputSchema,
    outputSchema: BusinessForecastOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
