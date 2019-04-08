import React from 'react';
import styles from './CreateEvent.module.css';

const createEvent = (props) => {
    const options = props.colors.map(color => {
        console.log(color)
        return <option key={color.label} value={color.hex}>{color.label}</option>;
    });

    console.log(options)

    return (
        <div className={styles.CreateEvent} onSubmit={props.onSubmitHandler}>
            <h3>Create event</h3>
            <form>
                <div><label htmlFor="title">Event title:</label> <input type="text" name="title" maxLength="30" required /></div>
                <div><label htmlFor="start">Start time:</label> <input type="time" name="start" min="9:00" max="18:00" required /></div>
                <div><label htmlFor="end">End time:</label> <input type="time" name="end" min="9:00" max="18:00" required /></div>
                <div><label htmlFor="background">Choose background: </label>
                    <select name="background">
                        <option value="">Please select</option>
                        {options}
                    </select>
                </div>
                <div>
                    <button onClick={props.closeHandler}>Cancel</button>
                    <button type="submit">Create event</button>
                </div>
            </form>
        </div>
    );
}

export default createEvent;