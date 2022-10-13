import { Appointment } from './../entities/appointment ';
export interface AppointmentsRepository{
    create (appointmente: Appointment): Promise<void>;
        findOverlappingAppointment(starts: Date, endsAt: Date): Promise<Appointment | null>;
}