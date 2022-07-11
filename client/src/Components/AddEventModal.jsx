import React from "react";
import Modal from "react-modal";
import Datetime from 'react-datetime';

export default function ({isOpen, onClose, onEventAdded}){
    const [title, setTitle] = React.useState("");
    const [start, setStart] = React.useState(new Date());
    const [end, setEnd] = React.useState(new Date());

    const onSubmit = (e) => {
        e.preventDefault();
        onEventAdded({
            title,
            start,
            end
        });
    }
    return (
        <Modal isOpen={isOpen} onRequestClose={onClose}>
            <form onSubmit={onSubmit}>
                <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />

                <div>
                    <label>Start Date</label>
                    <Datetime value={start} onChange={date => setStart(date)}></Datetime>
                </div>

                <div>
                    <label>End Date</label>
                    <Datetime value={end} onChange={date => setEnd(date)}></Datetime>
                </div>

                <button>Add Event</button>
            </form>
        </Modal>
    )
}