import React from 'react';
import DayListItem from './DaylistItem';

export default function DayList(props) {
  const { days, day, setDay } = props;

  const dayItem = () => (
    <div>
      {days.map((item) => (
        <DayListItem
          key={item.id}
          name={item.name}
          setDay={setDay}
          spots={item.spots}
          selected={item.name === day}
        />
      ))}
    </div>
  );

  const items = dayItem();

  return <>{items}</>;
}
