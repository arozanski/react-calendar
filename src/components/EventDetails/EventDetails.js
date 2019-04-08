import React from 'react';
import Aux from '../../hoc/Aux/Aux';
import styles from './EventDetails.module.css';

const eventDetails = (props) => {
    const start = new Date(props.event.start);
    const end = new Date(props.event.end);

    const startMinutes = start.getMinutes().toString();
    const endMinutes = end.getMinutes().toString();

    const startTime = start.getHours().toString() + ':' + (startMinutes.length === 1 ? '0' + startMinutes : startMinutes);
    const endTime = end.getHours().toString() + ':' + (endMinutes.length === 1 ? '0' + endMinutes : endMinutes);

    return (
        <Aux>
            <h3>{props.event.title}</h3>
            <p>Start time: {startTime}</p>
            <p>End time: {endTime}</p>
            <div className={styles.EventDetails}>
                <button onClick={props.closeHandler}>Close</button>
                <button onClick={() => props.deleteHandler(props.event.id)}>Delete</button>
                <button onClick={() => props.editHandler(props.event)}>Edit</button>
            </div>
        </Aux>
    );
}

export default eventDetails;