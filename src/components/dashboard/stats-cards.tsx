import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { STATS_DATA } from "@/lib/data";
import { DollarSign, TrendingUp, CreditCard, Activity } from "lucide-react";

const iconMap = {
  DollarSign,
  TrendingUp,
  CreditCard,
  Activity,
};

export default function StatsCards() {
  return (
    <>
      {STATS_DATA.map((stat, index) => {
        const Icon = iconMap[stat.icon as keyof typeof iconMap];
        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.amount}</div>
              <p className="text-xs text-muted-foreground">{stat.percentage}</p>
            </CardContent>
          </Card>
        );
      })}
    </>
  );
}
