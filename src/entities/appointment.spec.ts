import { Appointment } from './appointment ';
import { expect, test } from 'vitest';
import{ getFutureDate } from '../tests/utils/get-future-date';

test('create an apppointment' , () => {
     const startsAt = getFutureDate('2022-08-10')
    const endsAt = getFutureDate ('2022-08-11')

    startsAt.setDate(startsAt.getDate()+ 1)
    endsAt.setDate(endsAt.getDate() + 2)

    const appointment = new Appointment({
       customer :'Jonh Doe',
       startsAt,
       endsAt, 
    })
    expect(appointment).toBeInstanceOf(Appointment)
    expect(appointment.customer).toEqual('Jonh Doe')
});

test('cannot create an appointment with date before start date ', () =>{

    const startsAt = getFutureDate('2022-08-10')
    const endsAt = getFutureDate ('2022-08-09')

    // const startsAt = new Date()
    // const endsAt = new Date()

    // endsAt.setDate(endsAt.getDate() -1)

     expect(() =>{
        return new Appointment({
            customer: 'Jonh Doe',
            startsAt,
            endsAt,
        })
        }).toThrow()
    })

test('cannot create an appointment with start date before now ', () =>{
    const startsAt = new Date()
    const endsAt = new Date()

    startsAt.setDate(startsAt.getDate() - 1)
    endsAt.setDate(endsAt.getDate() + 3)

    expect(() =>{
        return new Appointment({
            customer: 'Jonh Doe',
            startsAt,
            endsAt
        })
    }).toThrow()
})