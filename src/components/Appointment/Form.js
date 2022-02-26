import React, { useEffect, useState } from "react";
import InterviewerList from "../InterviewerList";
import Button from "../Button";

function Form(props) {
  const { interviewers, onSave, onCancel, interview } = props;

  const [error, setError] = useState("");
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(null);

  function reset() {
    setStudent("");
    setInterviewer("");
  }
  function cancel() {
    setError(null);
    reset();
    onCancel();
  }
  function validate() {
    if (student === "") {
      setError("student name cannot be blank");
      return;
    }
    if (interview === "" || interviewer === null) {
      setError("interviewers name cannot be blank");
      return;
    }
    setError("");
    onSave(student, interviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(e) => e.preventDefault()}>
          <input
            value={student && student}
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            onChange={(e) => setStudent(e.target.value)}
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          interviewers={interviewers}
          interviewer={interviewer}
          onChange={setInterviewer}
          interview={interview}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={() => cancel()} danger>
            Cancel
          </Button>
          <Button onClick={() => validate()} confirm>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}

export default Form;
