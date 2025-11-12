import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { RECENT_SALES_DATA } from "@/lib/data";

export default function RecentSales() {
  return (
    <div className="space-y-8">
      {RECENT_SALES_DATA.map((sale, index) => (
        <div key={index} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarFallback>{sale.initials}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{sale.name}</p>
            <p className="text-sm text-muted-foreground">{sale.email}</p>
          </div>
          <div className="ml-auto font-medium">{sale.amount}</div>
        </div>
      ))}
    </div>
  );
}
