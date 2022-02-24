import React from "react";
import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import { useApplicationData } from "../hooks/useApplicationData";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "../helpers/selectors";

export default function Application() {
  const { state, setDay, bookInterview, cancelInterview } =
    useApplicationData();

  const { day, days } = state;

  const interviewersForDay = getInterviewersForDay(state, day);
  const appointmentsForDay = getAppointmentsForDay(state, day);

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        {days && <DayList days={days} day={day} setDay={setDay} />}
        <nav className="sidebar__menu" />
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />{" "}
      </section>
      <section className="schedule">
        {appointmentsForDay &&
          appointmentsForDay.map((appointment) => {
            const interview = getInterview(state, appointment.interview);
            return (
              <Appointment
                key={appointment.id}
                id={appointment.id}
                time={appointment.time}
                interview={interview}
                interviewers={interviewersForDay}
                bookInterview={bookInterview}
                cancelInterview={cancelInterview}
              />
            );
          })}
        <Appointment key="Last" time="5pm" />
      </section>
    </main>
  );
}
