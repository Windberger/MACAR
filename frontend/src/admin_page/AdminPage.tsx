import { useContext, useEffect, useState } from "react";
import AppointmentDialog from "./components/AppointmentDialog";
import AppointmentList from "./components/AppointmentList";
import { IAppointment } from "./interfaces/IAppointment";
import { getAppointmentsByWeek } from "./services/appointmentService";
import { UserContext } from "../homepage/context/UserContext";
import CustomerList from "./components/CustomerList";
import WeeklySchedule from "./components/WeeklySchedule";

function AdminPage() {
    const [appointments, setAppointments] = useState<IAppointment[]>([
        {
            title: "Mock Appointment",
            id: 1,
            datetime: new Date("2023-10-10T10:00:00"),
            datetimeString: "2023-10-10T10:00:00",
            type: "Consultation",
            description: "Mock Appointment",
        },
        {
            title: "Mock 2",
            id: 2,
            datetime: new Date("2023-11-10T11:00:00"),
            datetimeString: "2023-11-10T11:00:00",
            type: "Consultation",
            description: "Mock Description",
        },
        {
            title: "Mock 3",
            id: 3,
            datetime: new Date("2025-16-05T11:00:00"),
            datetimeString: "2025-05-16T11:00:00",
            type: "Consultation",
            description: "Mock Description",
        },
    ]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState<IAppointment | null>(null);

    const userContext = useContext(UserContext);
    if (!userContext) {
        throw new Error("UserContext not found");
    }
    const { token } = userContext;

    useEffect(() => {
        if (token) {
            getAppointmentsByWeek(token, new Date()).then((fetchedAppointments) => {
                setAppointments((prevAppointments) => [...prevAppointments, ...fetchedAppointments]);
            });
        }
    }, [token]);

    const handleOpenDialog = (appointment: IAppointment | null = null, dateTime: Date | null = null) => {
        if (!appointment && dateTime) {
            setSelectedAppointment({
                id: Date.now(),
                datetime: dateTime,
                datetimeString: dateTime.toISOString(),
                type: "",
                description: "",
                title: "",
            });
        } else {
            setSelectedAppointment(appointment);
        }
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setSelectedAppointment(null);
    };

    const handleSubmit = (appointmentData: IAppointment) => {
        if (selectedAppointment) {
            // Update existing appointment
            setAppointments((prevAppointments) =>
                prevAppointments.map((appt) =>
                    appt.id === selectedAppointment.id ? { ...appt, ...appointmentData } : appt
                )
            );
        } else {
            // Add new appointment
            setAppointments((prevAppointments) => [
                ...prevAppointments,
                { ...appointmentData, id: Date.now() }, // Ensure a unique ID
            ]);
        }
        setIsDialogOpen(false);
        setSelectedAppointment(null);
    };

    const handleDelete = (id: number) => {
        setAppointments(appointments.filter(appt => appt.id !== id));
    };

    const handleEdit = (updatedAppointment: IAppointment) => {
        setAppointments(appointments.map(appt => appt.id === updatedAppointment.id ? updatedAppointment : appt));
    };

    const isCurrentWeek = (date: Date) => {
        const now = new Date();
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - now.getDay() + 1); // Monday
        startOfWeek.setHours(0, 0, 0, 0);

        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6); // Sunday
        endOfWeek.setHours(23, 59, 59, 999);

        return date >= startOfWeek && date <= endOfWeek;
    };

    const currentWeekAppointments = appointments.filter(appt => isCurrentWeek(appt.datetime));

    return (
        <div className="flex flex-col h-screen bg-white dark:bg-gray-800">
            {/* Sticky Navbar */}
            <div className="sticky top-0 z-10 bg-black dark:bg-gray-800 p-2 shadow flex justify-between items-center">
                <div className="text-xl text-white font-bold tracking-widest">MACAR</div>
                <div className="flex gap-2 p-1">
                    <button
                        className="text-white bg-black dark:bg-gray-400 dark:text-black dark:hover:text-white dark:hover:bg-black hover:text-black hover:bg-white"
                        onClick={() => handleOpenDialog()}
                    >
                        Make Appointment
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex flex-row flex-grow mt-4 gap-2 px-8 py-2">
                {/* WeeklySchedule */}
                <div className="w-2/3 h-[600px] overflow-y-auto border border-gray-300 rounded-lg">
                    <WeeklySchedule
                        appointments={currentWeekAppointments}
                        setAppointments={setAppointments}
                        onAppointmentClick={handleOpenDialog}
                    />
                </div>

                {/* AppointmentList */}
                <div className="w-1/3 flex flex-col gap-2 h-full overflow-y-auto">
                    <AppointmentList
                        appointmentProp={appointments}
                        onDelete={handleDelete}
                        onEdit={handleEdit}
                    />
                </div>
            </div>

            {/* CustomerList */}
            <div className="p-4 dark:bg-gray-800">
                <CustomerList />
            </div>

            {/* AppointmentDialog */}
            {isDialogOpen && (
                <AppointmentDialog
                    open={isDialogOpen}
                    onClose={handleCloseDialog}
                    onSubmit={handleSubmit}
                    appointment={selectedAppointment}
                />
            )}
        </div>
    );
}

export default AdminPage;