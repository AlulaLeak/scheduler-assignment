import React from 'react';
import 'components/DayListItem.scss';
import classNames from 'classnames';
import { useApplicationData } from '../hooks/useApplicationData';

export default function DayListItem(props) {
  const { formatSpots } = useApplicationData();

  const {
    name, setDay, spots, selected,
  } = props;

  const remainingSpots = formatSpots(spots);

  const dayListItemStyle = classNames({
    'day-list__item': name,
  }, {
    'day-list__item--full': spots === 0,
  }, {
    'day-list__item--selected': selected,
  });

  return (
    <li
      className={dayListItemStyle}
      onClick={() => {
        setDay(name);
      }}
    >
      <h2>{name}</h2>
      <h3>{remainingSpots}</h3>
    </li>
  );
}
