import React from 'react';
import styles from './CreateEvent.module.css';

const createEvent = (props) => {
    return (
        <div className={styles.CreateEvent} onSubmit={props.onSubmitHandler}>
            <h3>Create event</h3>
            <form>
                <div><label htmlFor="title">Event title:</label> <input type="text" name="title" maxLength="30" required /></div>
                <div><label htmlFor="start">Start time:</label> <input type="time" name="start" min="9:00" max="18:00" required /></div>
                <div><label htmlFor="end">End time:</label> <input type="time" name="end" min="9:00" max="18:00" required /></div>
                <div></div>
                <div><button type="submit">Create event</button></div>
            </form>
        </div>
    );
}

export default createEvent;