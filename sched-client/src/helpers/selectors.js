
export function getAppointmentsForDay(state, day) {

    const { days, appointments } = state;
    let dayObject = days.filter((dayz) => dayz.name === day)
    dayObject = dayObject[0]

    if (!dayObject) {
        return []
    }

    const { appointments: appointmentsIdArray } = dayObject
    let intArray = []

    for (const id of appointmentsIdArray) {
        intArray.push(appointments[id])
    }

    return intArray
}

export function getInterview(state, interview) {

    const { interviewers } = state

    if (interview) {

        const intId = interview.interviewer && interview.interviewer.toString()
    
        const obj = {
            "student": interview.student,
            "interviewer": interviewers[intId]
        }
        return obj
    }
    return null

}



export function getInterviewersForDay(state, day) {

    const { days, interviewers } = state;
    let dayObject = days.filter((dayz) => dayz.name === day)
    dayObject = dayObject[0]

    if (!dayObject) {
        return []
    }

    const { interviewers: interviewersIdArray } = dayObject
    let intArray = []

    for (const id of interviewersIdArray) {
        intArray.push(interviewers[id])
    }
    return intArray

}