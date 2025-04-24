import { useContext, useState } from 'react';
import AppointmentDialog from "./components/AppointmentDialog";
import AppointmentList from "./components/AppointmentList";
import { IAppointment } from "./interfaces/IAppointment";
import { Button } from "@mui/material";
import { getAppointmentsByWeek } from "./services/appointmentService.ts";
import { UserContext } from "../homepage/context/UserContext.tsx";
import CustomerList from "./components/CustomerList.tsx";
import WeeklySchedule from "./components/WeeklySchedule.tsx";

function AdminPage() {
    const [appointments, setAppointments] = useState<IAppointment[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const userContext = useContext(UserContext);
    if (!userContext) {
        throw new Error("UserContext not found");
    }
    const { token } = userContext;

    const handleOpenDialog = () => {
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };

    const handleSubmit = (appointmentData: IAppointment) => {
        setAppointments([...appointments, appointmentData]);
        setIsDialogOpen(false);
    };

    const handleDelete = (id: number) => {
        setAppointments(appointments.filter(appt => appt.id !== id));
    };

    const handleEdit = (updatedAppointment: IAppointment) => {
        setAppointments(appointments.map(appt => appt.id === updatedAppointment.id ? updatedAppointment : appt));
    };

    const getAppointments = () => {
        if (token) {
            getAppointmentsByWeek(token, new Date()).then((appointments) => {
                setAppointments(appointments);
            });
        }
        console.log(appointments);
    };

    return (
        <div className="flex flex-col h-screen">
            {/* Sticky Navbar */}
            <div className="sticky top-0 z-10 bg-black p-2 shadow flex justify-between items-center">
                {/* Left-aligned MACAR */}
                <div className="text-xl text-white font-bold tracking-widest">MACAR</div>

                {/* Right-aligned buttons */}
                <div className="flex gap-2 p-1">
                    <button className="text-white bg-black hover:text-black hover:bg-white" onClick={getAppointments}>Get Appointments By Week</button>
                    <button className="text-white bg-black hover:text-black hover:bg-white" onClick={handleOpenDialog} variant="contained">
                        Make Appointment
                    </button>
                </div>
            </div>

            {/* Hauptinhalt */}
            <div className="flex flex-row flex-grow mt-4 gap-2 px-8 py-2">
                {/* WeeklySchedule mit fester Größe */}
                <div className="w-2/3 h-[600px] overflow-y-auto border border-gray-300 rounded-lg">
                    <WeeklySchedule/>
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

            {/* CustomerList – unten fixiert */}
            <div className="p-4">
                <CustomerList/>
            </div>

            {/* Dialog */}
            {isDialogOpen && (
                <AppointmentDialog
                    open={isDialogOpen}
                    onClose={handleCloseDialog}
                    onSubmit={handleSubmit}
                />
            )}
        </div>
    );
}

export default AdminPage;
