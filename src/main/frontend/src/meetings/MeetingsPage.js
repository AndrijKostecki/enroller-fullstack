import {useEffect, useState} from "react";
import NewMeetingForm from "./NewMeetingForm";
import MeetingsList from "./MeetingsList";

export default function MeetingsPage({username}) {
    const [meetings, setMeetings] = useState([]);
    const [addingNewMeeting, setAddingNewMeeting] = useState(false);

    useEffect(() => {
        const fetchMeetings = async () => {
            const response = await fetch(`/api/meetings`);
            if (response.ok) {
                const meetings = await response.json();
                setMeetings(meetings);
            }
        };
        fetchMeetings();
    }, []);

    async function handleNewMeeting(meeting) {
        const response = await fetch('/api/meetings', {
            method: 'POST',
            body: JSON.stringify(meeting),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            const newMeetings = await response.json();
            const nextMeetings = [...meetings, newMeetings];
            setMeetings(nextMeetings);
            setAddingNewMeeting(false);
        }
    }

    async function handleDeleteMeeting(meeting) {

        const response = await fetch(`/api/meetings/${meeting.id}`, {
            method: 'DELETE',
            //body: JSON.stringify(meeting),
            //headers: {'Content-Type': 'application/json'}
        });
        if (response.ok) {
            const nextMeetings = meetings.filter(m => m !== meeting);
            setMeetings(nextMeetings);

        }

    }

    async function handleAddParticipant(participant, meeting) {
            const response = await fetch(`/api/meetings/${meeting.id}/participants/${username}`, {
                method: 'PUT',
                body: JSON.stringify(participant),
                headers: {'Content-Type': 'application/json'}
            });
            if (response.ok) {
                const newParticipant = await response.json();
                setMeetings(participant);

            }
        }

    /*async function handleDeleteParticipant(participant, meeting) {

        const response = await fetch(`/api/meetings/${meeting.id}/participants/${participant.}`, {
            method: 'DELETE',
            //body: JSON.stringify(meeting),
            //headers: {'Content-Type': 'application/json'}
        });
        if (response.ok) {
            const nextMeetings = meetings.filter(m => m !== meeting);
            setMeetings(nextMeetings);

        }
    }*/




    return (
        <div>
            <h2>Zajęcia ({meetings.length})</h2>
            {
                addingNewMeeting
                    ? <NewMeetingForm onSubmit={(meeting) => handleNewMeeting(meeting)}/>
                    : <button onClick={() => setAddingNewMeeting(true)}>Dodaj nowe spotkanie</button>
            }
            {meetings.length > 0 &&
                <MeetingsList meetings={meetings} username={username}
                              onDelete={handleDeleteMeeting}/>}

            {
                meetings.length > 0 && (
                    <button onClick={() => handleAddParticipant({ username, meeting: meetings[0] })}
                            onHandleAddParticipant={handleAddParticipant}>Dołącz do spotkania</button>


                )
            }



        </div>
    )
}
