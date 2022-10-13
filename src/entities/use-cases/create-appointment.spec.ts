import { InMemoryAppointmentsRepository } from './../../repositories/in-memory/in-memory-appointment';
import { Appointment } from './../appointment ';
import { CreateAppointment } from './create-appointment';
import {describe, expect, it } from "vitest";
import { getFutureDate } from '../../tests/utils/get-future-date';

describe ('Create Appointment', () => {
    it ('should not be able to create an appointment with overlapping dates' ,async () => {
        
         const startsAt = getFutureDate('2022-08-10')
         const endsAt = getFutureDate ('2022-08-15')

        const appointmentsRepository = new InMemoryAppointmentsRepository()
         const createAppointment = new CreateAppointment(appointmentsRepository)

         await createAppointment.execute({
            customer: 'Jonh Doe',
            startsAt,
            endsAt
         })
          expect(createAppointment.execute({
            customer:'Jonh Doe',
            startsAt:getFutureDate('2022-08-09'),
            endsAt:getFutureDate('2022-08-12'),
        })).rejects.toBeInstanceOf(Error)


          expect(createAppointment.execute({
            customer:'Jonh Doe',
            startsAt:getFutureDate('2022-08-10'),
            endsAt:getFutureDate('2022-08-15'),
        })).rejects.toBeInstanceOf(Error)

        expect(createAppointment.execute({
            customer:'Jonh Doe',
            startsAt:getFutureDate('2022-08-13'),
            endsAt:getFutureDate('2022-08-17'),
        })).rejects.toBeInstanceOf(Error)
    })
})