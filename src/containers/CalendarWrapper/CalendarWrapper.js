import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import { connect } from 'react-redux';
import Event from '../Event/Event';
import Ax from '../../hoc/Ax/ax';
import Modal from '../../components/UI/Modal/Modal';
import CreateEvent from '../../components/CreateEvent/CreateEvent';
import * as eventActions from '../../store/actions/events';

const localizer = BigCalendar.momentLocalizer(moment);

const initState = {
    visible: false,
    start: null,
    end: null,
}

class CalendarWrapper extends Component {
    constructor(...args) {
        super(...args);

        this.state = initState;
    }

    closeModalHandler = () => {
        this.showModal(false);
        this.props.deselectEvent();
    }

    showModal = (visible) => {
        this.setState({visible});
        if (!visible) {
            this.setState(initState);
        }
    }

    selectEmptySlotHandler = ({ start, end }) => {
       this.showModal(true);
       this.setState({ start, end });
    }

    selectEventHandler = (event) => {
        this.props.onSelectEvent(event);
        this.showModal(true);
    }

    onSubmitHandler = (event) => {
        event.preventDefault();

        const start = new Date(this.state.start);
        const end = new Date(this.state.end);

        start.setHours(event.target.elements.start.value.split(':')[0]);
        start.setMinutes(event.target.elements.start.value.split(':')[1]);

        end.setHours(event.target.elements.end.value.split(':')[0]);
        end.setMinutes(event.target.elements.end.value.split(':')[1])

        const newEvent = {
            title: event.target.elements.title.value,
            start: start,
            end: end
        }

        this.props.onAddEvent(newEvent);
        this.showModal(false);
    }

    render () {
        const modalContent = (<Ax>{this.props.selected ? <Event title={this.props.selected.title} /> : <CreateEvent onSubmitHandler={this.onSubmitHandler}/>}</Ax>);

        return (
            <Ax>
                <Modal show={this.state.visible}
                    modalClosed={this.closeModalHandler}>
                    {modalContent}</Modal>
                <BigCalendar
                    selectable
                    localizer={localizer}
                    events={this.props.events}
                    components={{ event: Event }}
                    step={60}
                    showMultiDayTimes
                    defaultDate={new Date()}
                    onSelectEvent={event => this.selectEventHandler(event)}
                    onSelectSlot={this.selectEmptySlotHandler} />
            </Ax>
        );
    }
}

const mapStateToProps = state => {
    return {
        events: state.event.events,
        selected: state.event.selected,
        colors: state.color.colors
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSelectEvent: (event) => dispatch(eventActions.setSelectedEvent(event)),
        deselectEvent: () => dispatch(eventActions.deselectEvent()),
        onAddEvent: (event) => dispatch(eventActions.addEvent(event))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarWrapper);