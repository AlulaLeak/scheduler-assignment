import React from "react";
import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"
import Error from "./Error"
import Status from "./Status"
import Confirm from "./Confirm"
import Form from "../../components/Appointment/Form"
import "./styles.scss";
import { useVisualMode } from "../../hooks/useVisualMode"

function Appointment(props) {

  const { time, interview, interviewers, bookInterview, id, cancelInterview } = props

  const EMPTY = "EMPTY"
  const SHOW = "SHOW"
  const CREATE = "CREATE"
  const SAVING = "SAVING"
  const DELETING = "DELETING"
  const CONFIRM = "CONFIRM"
  const EDIT = "EDIT"
  const ERROR_SAVE = "ERROR_SAVE"
  const ERROR_DELETE = "ERROR_DELETE"

  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  )


  function save(name, interviewer) {
    transition(SAVING)
    const interview = {
      student: name,
      interviewer
    };
    bookInterview(id, interview)
    .then(() => {
      transition(SHOW)
    })
    .catch((err) => {
      transition(ERROR_SAVE)
    })

  }
  function confirmDelete() {
    transition(CONFIRM)
  }
  function cancelDelete() {
    back(SHOW)
  }

  function removeInterview() {
    transition(DELETING)
    cancelInterview(id)
    .then(() => {
      transition(EMPTY)
    })
    .catch((err) => {
      const replace = true
      transition(ERROR_DELETE, replace)
    })
  }
  function editAppointment() {
    transition(EDIT)
  }
  function closeErrorFromCreate() {
    back(EMPTY)
  }
  function closeErrorFromDelete() {
    back(SHOW)
  }

  return (
    <article className="appointment">
      <Header time={time} />
        {mode === EMPTY && (
          <Empty
            onAdd={() => transition(CREATE)}
          />
        )}
        {
        mode === SHOW && (
          <Show
            student={interview.student}
            interviewer={interview.interviewer}
            cancelInterview={confirmDelete}
            onEdit={editAppointment}
          />
        )}
        {
        mode === CREATE && (
          <Form
            interviewers={interviewers}
            onSave={save}
            onCancel={() => back(EMPTY)}
            interview={interview}
          />
        )}
        {
        mode === SAVING && (
          <Status
            message={'Saving'}
          />
        )}
        {
        mode === DELETING && (
          <Status
            message={'Deleting'}
          />
        )}
        {
          mode === CONFIRM && (
            <Confirm
              onConfirm={removeInterview}
              message={'Delete this appointment?'}
              onCancel={cancelDelete}
            />
          )
        }
        {
          mode === EDIT && (
            <Form
              student={interview.student}
              interviewers={interviewers}
              onSave={save}
              onCancel={() => back(EMPTY)}
              interview={interview}
            />
          )
        }
        {
          mode === ERROR_SAVE && (
            <Error
              message={"Error Saving"}
              onClose={() => closeErrorFromCreate()}
            />
          )
        }
        {
          mode === ERROR_DELETE && (
            <Error
              message={"Error Deleting"}
              onClose={() => closeErrorFromDelete()}
            />
          )
        }
    </article>
  )
}

export default Appointment;