import React from 'react';
import Aux from '../../hoc/Aux/Aux';
import styles from './EventDetails.module.css';

const eventDetails = (props) => {
    return (
        <Aux>
            <h3>{props.event.title}</h3>
            <div className={styles.EventDetails}>
                <button onClick={props.closeHandler}>Close</button>
                <button onClick={() => props.deleteHandler(props.event.id)}>Delete</button>
                <button onClick={props.editHandler}>Edit</button>
            </div>
        </Aux>
    );
}

export default eventDetails;