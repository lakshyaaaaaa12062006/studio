import AppointmentCalendar from "@/components/calendar/appointment-calendar";

export default function CalendarPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <h1 className="text-2xl font-bold tracking-tight">Appointment Calendar</h1>
      <AppointmentCalendar />
    </main>
  );
}
