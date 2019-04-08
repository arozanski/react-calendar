import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import { connect } from 'react-redux';
import Event from '../../components/Event/Event';
import EventDetails from '../../components/EventDetails/EventDetails';
import Aux from '../../hoc/Aux/Aux';
import Modal from '../../components/UI/Modal/Modal';
import CreateEvent from '../../components/CreateEvent/CreateEvent';
import * as eventActions from '../../store/actions/events';
import {default as UUID} from 'node-uuid';

const localizer = BigCalendar.momentLocalizer(moment);

const initState = {
    visible: false,
    editMode: false,
    event: {
        start: null,
        end: null,
        title: '',
        backgroundColor: null,
        id: null
    }
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

    selectEmptySlotHandler = ({ start, end, title, id }) => {
       this.showModal(true);
       this.setState( { event: { start, end, title: title || '', id: id || '' }});
    }

    selectEventHandler = (event) => {
        this.props.onSelectEvent(event);
        this.showModal(true);
    }

    onSubmitHandler = (event, eventId) => {
        event.preventDefault();
        const start = new Date(this.state.event.start);
        const end = new Date(this.state.event.end);

        start.setHours(event.target.elements.start.value.split(':')[0]);
        start.setMinutes(event.target.elements.start.value.split(':')[1]);

        end.setHours(event.target.elements.end.value.split(':')[0]);
        end.setMinutes(event.target.elements.end.value.split(':')[1])

        const newEvent = {
            title: event.target.elements.title.value,
            start: start,
            end: end,
            backgroundColor: event.target.elements.background.value || '#3174ad',
            id: eventId || UUID.v4()
        };

        if (this.state.editMode) {
            this.props.onUpdateEvent(newEvent);
        } else {
            this.props.onAddEvent(newEvent);
            this.setState({ editMode: false })
        }

        this.showModal(false);
    }

    deleteHandler = (eventId) => {
        this.props.onDeleteEvent(eventId);
        this.showModal(false);
        this.props.deselectEvent();
    }

    editHandler = (event) => {
        this.closeModalHandler();
        this.setState({ editMode: true });
        this.selectEventHandler(event);
        this.selectEmptySlotHandler({start: event.start, end: event.end, title: event.title, id: event.id });
    }

    onChangeHandler = (value, elementName) => {
        const newEvent = {...this.state.event, [elementName]: value};

        this.setState({ event: newEvent });
    }

    render () {
        const modalContent = (<Aux>{this.props.selected && !this.state.editMode ? 
            <EventDetails 
                event={this.props.selected}
                closeHandler={this.closeModalHandler}
                editHandler={this.editHandler}
                deleteHandler={this.deleteHandler}
                /> : 
            <CreateEvent onSubmitHandler={this.onSubmitHandler} 
                editMode={this.state.editMode}
                event={this.state.event}
                colors={this.props.colors}
                change={this.onChangeHandler}
                closeHandler={this.closeModalHandler}/>}</Aux>);

        return (
            <Aux>
                <Modal show={this.state.visible}
                    modalClosed={this.closeModalHandler}>
                    {modalContent}</Modal>
                <BigCalendar
                    selectable
                    localizer={localizer}
                    events={this.props.events}
                    components={{ event: Event }}
                    step={60}
                    defaultDate={new Date()}
                    onSelectEvent={event => this.selectEventHandler(event)}
                    onSelectSlot={this.selectEmptySlotHandler} />
            </Aux>
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
        onAddEvent: (event) => dispatch(eventActions.addEvent(event)),
        onDeleteEvent: (eventId) => dispatch(eventActions.deleteEvent(eventId)),
        onUpdateEvent: (event) => dispatch(eventActions.updateEvent(event))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarWrapper);