import React from 'react';
import InterviewerListItem from './InterviewerListItem';
import './InterviewerList.scss';
import { PropTypes } from 'prop-types';

function InterviewerList(props) {
  const { interviewers, value, onChange } = props;

  const interviewItem = () => (
    <ul className="interviewers__list">
      {interviewers.map((item) => (
        <InterviewerListItem
          key={item.id}
          name={item.name}
          avatar={item.avatar}
          selected={item.id === value}
          setInterviewer={() => onChange(item.id)}
          interviewer={value}
        />
      ))}
    </ul>
  );

  const items = interviewItem();

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewers</h4>
      {items}
    </section>
  );
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired,
};

export default InterviewerList;
