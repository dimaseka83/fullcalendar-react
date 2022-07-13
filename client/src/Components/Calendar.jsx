import React from "react";
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from '@fullcalendar/interaction' // a plugin
import AddEventModal from "./AddEventModal";
import axios from "axios";
import moment from "moment";
export default function () {
    const [modalOpenAdd, setModalOpenAdd] = React.useState(false);
    const [events, setEvents] = React.useState([]);
    const [selectedEvent, setSelectedEvent] = React.useState([]);
    const calendarRef = React.useRef(null);
    

    const onEventAdded = (event) => {
        let calendarApi = calendarRef.current.getApi();
        calendarApi.addEvent({
            start: moment(event.start).toDate(),
            end: moment(event.end).toDate(),
            title: event.title
        });
    }
    async function handleEventAdd(data) {
        await axios.post("/api/calendar/create-event", data.event);
    }

    async function handleDataSet(data) {
        const response = await axios.get("/api/calendar/get-events?start=" + moment(data.start).toISOString() + "&end=" + moment(data.end).toISOString());
        setEvents(response.data);
    }

    async function details(event) {
        const response = await axios.get("/api/calendar/get-event/" + event._def.extendedProps._id);
        setSelectedEvent(response.data);
    }

    return (
        <section>
            <button onClick={() => setModalOpenAdd(true)}>Add Event</button>
            <div style={{position: "relative", zIndex: 0}}>
            <FullCalendar
                    ref={calendarRef}
                    events={events}
                    plugins={[ dayGridPlugin, interactionPlugin ]}
                    initialView="dayGridMonth"
                    eventClick={(event) => details(event.event)}
                    eventAdd={(event) => handleEventAdd(event)}
                    datesSet={(date) => handleDataSet(date)}
                />
            </div>
            <AddEventModal isOpen={modalOpenAdd} onClose={() => setModalOpenAdd(false)} onEventAdded={event => onEventAdded(event)} /> 
            <p>{selectedEvent.title}</p>
        </section>

    )
}