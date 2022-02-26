import React, { useEffect } from "react";
import "./InterviewerListItem.scss";
import classNames from "classnames";

function InterviewerListItem(props) {
  const { interview, name, avatar, selected, setInterviewer } = props;

  useEffect(() => {
    if (interview) {
      if (name === interview.interviewer.name) {
        setInterviewer();
      }
    }
  }, []);

  const interviewListStyle = classNames("interviews__item", {
    "interviewers__item--selected": selected,
  });
  function interviewerSelected() {
    return selected && name;
  }

  const intSelect = interviewerSelected();

  return (
    <li className={interviewListStyle} onClick={setInterviewer}>
      <img className="interviewers__item-image" src={avatar} alt={name} />
      {intSelect}
    </li>
  );
}

export default InterviewerListItem;
