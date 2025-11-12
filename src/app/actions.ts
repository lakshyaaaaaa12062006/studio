"use server";

import { generateBusinessForecast } from "@/ai/flows/generate-business-forecast";
import { CHART_DATA } from "@/lib/data";

interface FormState {
  forecastSummary: string;
  error?: string;
}

export async function handleGenerateForecast(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const marketConditions = formData.get("marketConditions") as string;

  try {
    const revenueData = CHART_DATA.map((d) => d.revenue).join(", ");
    const expenseData = CHART_DATA.map((d) => d.expenses).join(", ");

    const result = await generateBusinessForecast({
      revenueData,
      expenseData,
      marketConditions:
        marketConditions || "No specific market conditions provided.",
    });

    if (result.forecastSummary) {
      return { forecastSummary: result.forecastSummary };
    } else {
      return {
        forecastSummary: "",
        error: "The AI returned an empty forecast. Please try again.",
      };
    }
  } catch (e) {
    console.error(e);
    const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
    return {
      forecastSummary: "",
      error: `Failed to generate forecast. ${errorMessage}`,
    };
  }
}
