import { cn } from "@/lib/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

const months = [
    {
        name: "Enero",
        days: [
            { date: "2021-12-27" },
            { date: "2021-12-28" },
            { date: "2021-12-29" },
            { date: "2021-12-30" },
            { date: "2021-12-31" },
            { date: "2022-01-01", isCurrentMonth: true },
            { date: "2022-01-02", isCurrentMonth: true },
            { date: "2022-01-03", isCurrentMonth: true },
            { date: "2022-01-04", isCurrentMonth: true },
            { date: "2022-01-05", isCurrentMonth: true },
            { date: "2022-01-06", isCurrentMonth: true },
            { date: "2022-01-07", isCurrentMonth: true },
            { date: "2022-01-08", isCurrentMonth: true },
            { date: "2022-01-09", isCurrentMonth: true },
            { date: "2022-01-10", isCurrentMonth: true },
            { date: "2022-01-11", isCurrentMonth: true },
            { date: "2022-01-12", isCurrentMonth: true, isToday: true },
            { date: "2022-01-13", isCurrentMonth: true },
            { date: "2022-01-14", isCurrentMonth: true },
            { date: "2022-01-15", isCurrentMonth: true },
            { date: "2022-01-16", isCurrentMonth: true },
            { date: "2022-01-17", isCurrentMonth: true },
            { date: "2022-01-18", isCurrentMonth: true },
            { date: "2022-01-19", isCurrentMonth: true },
            { date: "2022-01-20", isCurrentMonth: true },
            { date: "2022-01-21", isCurrentMonth: true },
            { date: "2022-01-22", isCurrentMonth: true },
            { date: "2022-01-23", isCurrentMonth: true },
            { date: "2022-01-24", isCurrentMonth: true },
            { date: "2022-01-25", isCurrentMonth: true },
            { date: "2022-01-26", isCurrentMonth: true },
            { date: "2022-01-27", isCurrentMonth: true },
            { date: "2022-01-28", isCurrentMonth: true },
            { date: "2022-01-29", isCurrentMonth: true },
            { date: "2022-01-30", isCurrentMonth: true },
            { date: "2022-01-31", isCurrentMonth: true },
            { date: "2022-02-01" },
            { date: "2022-02-02" },
            { date: "2022-02-03" },
            { date: "2022-02-04" },
            { date: "2022-02-05" },
            { date: "2022-02-06" },
        ],
    },
    {
        name: "Febrero",
        days: [
            { date: "2022-01-31" },
            { date: "2022-02-01", isCurrentMonth: true },
            { date: "2022-02-02", isCurrentMonth: true },
            { date: "2022-02-03", isCurrentMonth: true },
            { date: "2022-02-04", isCurrentMonth: true },
            { date: "2022-02-05", isCurrentMonth: true },
            { date: "2022-02-06", isCurrentMonth: true },
            { date: "2022-02-07", isCurrentMonth: true },
            { date: "2022-02-08", isCurrentMonth: true },
            { date: "2022-02-09", isCurrentMonth: true },
            { date: "2022-02-10", isCurrentMonth: true },
            { date: "2022-02-11", isCurrentMonth: true },
            { date: "2022-02-12", isCurrentMonth: true },
            { date: "2022-02-13", isCurrentMonth: true },
            { date: "2022-02-14", isCurrentMonth: true },
            { date: "2022-02-15", isCurrentMonth: true },
            { date: "2022-02-16", isCurrentMonth: true },
            { date: "2022-02-17", isCurrentMonth: true },
            { date: "2022-02-18", isCurrentMonth: true },
            { date: "2022-02-19", isCurrentMonth: true },
            { date: "2022-02-20", isCurrentMonth: true },
            { date: "2022-02-21", isCurrentMonth: true },
            { date: "2022-02-22", isCurrentMonth: true },
            { date: "2022-02-23", isCurrentMonth: true },
            { date: "2022-02-24", isCurrentMonth: true },
            { date: "2022-02-25", isCurrentMonth: true },
            { date: "2022-02-26", isCurrentMonth: true },
            { date: "2022-02-27", isCurrentMonth: true },
            { date: "2022-02-28", isCurrentMonth: true },
            { date: "2022-03-01" },
            { date: "2022-03-02" },
            { date: "2022-03-03" },
            { date: "2022-03-04" },
            { date: "2022-03-05" },
            { date: "2022-03-06" },
            { date: "2022-03-07" },
            { date: "2022-03-08" },
            { date: "2022-03-09" },
            { date: "2022-03-10" },
            { date: "2022-03-11" },
            { date: "2022-03-12" },
            { date: "2022-03-13" },
        ],
    },
];


export default function Page() {
    return (
        <div>
            <div className="relative grid grid-cols-1 gap-x-14 md:grid-cols-2">
                <button
                    type="button"
                    className="absolute -left-1.5 -top-1 flex items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                >
                    <span className="sr-only">Mes anterior</span>
                    <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                    type="button"
                    className="absolute -right-1.5 -top-1 flex items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                >
                    <span className="sr-only">Proximo Mes</span>
                    <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                </button>
                {months.map((month, monthIdx) => (
                    <section
                        key={monthIdx}
                        className={cn(
                            monthIdx === months.length - 1 && "hidden md:block",
                            "text-center"
                        )}
                    >
                        <h2 className="text-sm font-semibold text-gray-900">
                            {month.name}
                        </h2>
                        <div className="mt-6 grid grid-cols-7 text-xs leading-6 text-gray-500">
                            <div>L</div>
                            <div>M</div>
                            <div>M</div>
                            <div>J</div>
                            <div>V</div>
                            <div>S</div>
                            <div>D</div>
                        </div>
                        <div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200">
                            {month.days.map((day, dayIdx) => (
                                <button
                                    key={day.date}
                                    type="button"
                                    className={cn(
                                        day.isCurrentMonth
                                            ? "bg-white text-gray-900"
                                            : "bg-gray-50 text-gray-400",
                                        dayIdx === 0 && "rounded-tl-lg",
                                        dayIdx === 6 && "rounded-tr-lg",
                                        dayIdx === month.days.length - 7 && "rounded-bl-lg",
                                        dayIdx === month.days.length - 1 && "rounded-br-lg",
                                        "relative py-1.5 hover:bg-gray-100 focus:z-10"
                                    )}
                                >
                                    <time
                                        dateTime={day.date}
                                        className={cn(
                                            day.isToday &&
                                            "bg-indigo-600 font-semibold text-white",
                                            "mx-auto flex h-7 w-7 items-center justify-center rounded-full"
                                        )}
                                    >
                                        {day.date?.split("-").pop()?.replace(/^0/, "")}
                                    </time>
                                </button>
                            ))}
                        </div>
                    </section>
                ))}
            </div>
            <section className="mt-12">
                <h2 className="text-base font-semibold leading-6 text-gray-900">
                    Próximos Eventos
                </h2>
                <ol className="mt-2 divide-y divide-gray-200 text-sm leading-6 text-gray-500">
                    <li className="py-4 sm:flex">
                        <time dateTime="2022-01-17" className="w-28 flex-none">
                            miércoles, 12 de enero
                        </time>
                        <p className="mt-2 flex-auto sm:mt-0">
                            Nada en el horario de hoy.
                        </p>
                    </li>
                    <li className="py-4 sm:flex">
                        <time dateTime="2022-01-19" className="w-28 flex-none">
                            Jueves, 13 de enero
                        </time>
                        <p className="mt-2 flex-auto font-semibold text-gray-900 sm:mt-0">
                            Ver a estudiante con hipertension.
                        </p>
                        <p className="flex-none sm:ml-6">
                            <time dateTime="2022-01-13T14:30">2:30 PM</time> -{" "}
                            <time dateTime="2022-01-13T16:30">4:30 PM</time>
                        </p>
                    </li>
                    <li className="py-4 sm:flex">
                        <time dateTime="2022-01-20" className="w-28 flex-none">
                            Viernes. 14 de Enero
                        </time>
                        <p className="mt-2 flex-auto font-semibold text-gray-900 sm:mt-0">
                            Entrevista Preempleo.
                        </p>
                        <p className="flex-none sm:ml-6">Todo el Dia</p>
                    </li>
                    <li className="py-4 sm:flex">
                        <time dateTime="2022-01-18" className="w-28 flex-none">
                            Lunes, 17 de Enero
                        </time>
                        <p className="mt-2 flex-auto font-semibold text-gray-900 sm:mt-0">
                            Modificar Inventario de Medicamentos.
                        </p>
                        <p className="flex-none sm:ml-6">
                            <time dateTime="2022-01-17T10:00">10:00 AM</time> -{" "}
                            <time dateTime="2022-01-17T10:15">10:15 AM</time>
                        </p>
                    </li>
                </ol>
            </section>
        </div>
    );
}
