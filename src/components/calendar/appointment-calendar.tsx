import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { APPOINTMENTS_DATA } from "@/lib/data";
import { Clock } from "lucide-react";

export default function AppointmentCalendar() {
  return (
    <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-3">
      <Card className="lg:col-span-2">
        <CardContent className="p-0">
          <Calendar
            mode="single"
            selected={new Date()}
            className="w-full p-0"
            classNames={{
              months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 p-4",
              month: "space-y-4 w-full",
              caption_label: "text-lg font-medium",
              table: "w-full border-collapse space-y-1",
              head_row: "flex justify-around",
              head_cell: "text-muted-foreground rounded-md w-full font-normal text-[0.8rem]",
              row: "flex w-full mt-2 justify-around",
              cell: "h-16 w-full text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
              day: "h-16 w-full p-1 font-normal aria-selected:opacity-100",
              day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground rounded-md",
              day_today: "bg-accent text-accent-foreground rounded-md",
            }}
          />
        </CardContent>
      </Card>
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {APPOINTMENTS_DATA.map((appointment, index) => (
              <div key={index} className="flex items-start gap-3">
                <Clock className="h-5 w-5 flex-shrink-0 text-muted-foreground mt-1" />
                <div className="flex-grow">
                  <p className="font-semibold">{appointment.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {appointment.time} &middot; {appointment.duration}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
