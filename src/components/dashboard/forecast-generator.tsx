"use client";

import { useFormState, useFormStatus } from "react-dom";
import { handleGenerateForecast } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { BrainCircuit, Loader2, Sparkles } from "lucide-react";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <Sparkles className="mr-2 h-4 w-4" />
          Generate Forecast
        </>
      )}
    </Button>
  );
}

export default function ForecastGenerator() {
  const initialState = { forecastSummary: "" };
  const [state, formAction] = useFormState(handleGenerateForecast, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.error) {
      toast({
        variant: "destructive",
        title: "Forecast Generation Failed",
        description: state.error,
      });
    }
  }, [state.error, toast]);

  return (
    <Card>
      <form action={formAction}>
        <CardHeader>
          <CardTitle>AI Business Forecast</CardTitle>
          <CardDescription>
            Let our AI analyze your revenue and expense data to generate a
            forecast and recommend actions. Describe the current market
            conditions for a more accurate analysis.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            name="marketConditions"
            placeholder="e.g., 'Increased competition in the sector, upcoming holiday season, new marketing campaign launched.'"
            className="min-h-[100px]"
          />
        </CardContent>
        <CardFooter className="flex justify-between">
          <p className="text-sm text-muted-foreground">
            Analysis is based on your recent financial data.
          </p>
          <SubmitButton />
        </CardFooter>
      </form>
      {state.forecastSummary && (
        <CardContent>
          <Alert>
            <BrainCircuit className="h-4 w-4" />
            <AlertTitle>Forecast Generated!</AlertTitle>
            <AlertDescription className="mt-2 whitespace-pre-wrap">
              {state.forecastSummary}
            </AlertDescription>
          </Alert>
        </CardContent>
      )}
    </Card>
  );
}
