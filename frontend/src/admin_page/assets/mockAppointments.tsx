// admin_frontend/src/components/mockAppointments.ts

import {IAppointment} from "../interfaces/IAppointment.ts";

export const mockAppointments: IAppointment[] = [
    {
        id: 1,
        datetime: new Date("2025-02-14T10:00:00"),
        datetimeString: "2025-02-14T10:00:00",
        title: "Project Meeting",
        type: "Meeting",
        description: "Projektbesprechung mit Team",
    },
    {
        id: 2,
        datetime: new Date("2025-02-15T14:00:00"),
        datetimeString: "2025-02-15T14:00:00",
        title: "Doctor Appointment",
        type: "Arzttermin",
        description: "Routineuntersuchung beim Arzt",
    },
    {
        id: 3,
        datetime: new Date("2025-02-16T09:00:00"),
        datetimeString: "2025-02-16T09:00:00",
        title: "Gym Session",
        type: "Sport",
        description: "Fitnessstudio Session",
    },
];