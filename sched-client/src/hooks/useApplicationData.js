import { useState, useEffect } from 'react';
import axios from 'axios';

export function useApplicationData() {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: [],
  });

  function formatSpots(spots) {
    if (spots === 0) return 'no spots remaining';
    if (spots > 1) return `${spots} spots remaining`;
    if (spots === 1) return '1 spot remaining';
  }

  function updateSpots(appointments) {
    const newDays = [...state.days];

    for (const day of newDays) {
      if (day.name === state.day) {
        let count = 0;
        for (const id of day.appointments) {
          if (!appointments[id].interview) {
            count += 1;
          }
        }
        day.spots = count;
      }
    }
    return newDays;
  }

  const setDay = (day) => {
    setState((state) => ({ ...state, day }));
  };

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const url = `http://localhost:8002/api/appointments/${id}`;

    if (interview) {
      return (axios
        .put(url, interview)
        .then((response) => {
          const newDays = updateSpots(appointments);
          console.log(response);
          setState({
            ...state,
            appointments,
            days: newDays,
          });
        }));
    }
  }

  function cancelInterview(id) {
    if (id) {
      const url = `http://localhost:8002/api/appointments/${id}`;

      return axios.delete(url)
        .then((response) => {
          console.log(response);
          const appointment = {
            ...state.appointments[id],
            interview: null,
          };
          const appointments = {
            ...state.appointments,
            [id]: appointment,
          };
          const newDays = updateSpots(appointments);
          setState({
            ...state,
            appointments,
            days: newDays,
          });
        });
    }
  }
  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8002/api/days'),
      axios.get('http://localhost:8002/api/appointments'),
      axios.get('http://localhost:8002/api/interviewers'),
    ]).then((all) => {
      const [days, appointments, interviewers] = all;
      setState((prev) => ({
        ...prev,
        days: days.data,
        appointments: appointments.data,
        interviewers: interviewers.data,
      }));
    });
  }, []);

  return {
    state, setDay, bookInterview, cancelInterview, formatSpots,
  };
}
