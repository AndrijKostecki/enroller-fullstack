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
            const newMeeting = await response.json();
            setMeetings([...meetings, newMeeting]);
            setAddingNewMeeting(false);
        }
    }

    async function handleDeleteMeeting(meeting) {
        const response = await fetch(`/api/meetings/${meeting.id}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            const nextMeetings = meetings.filter(m => m.id !== meeting.id);
            setMeetings(nextMeetings);
        }
    }

   async function handleAddParticipant(username, meeting) {
       const response = await fetch(`/api/meetings/${meeting.id}/participants/${username}`, {
           method: 'PUT',
           headers: {'Content-Type': 'application/json'}
       });
       if (response.ok) {
           const updatedMeeting = await response.json();
           const updatedMeetings = meetings.map(m =>
               m.id === updatedMeeting.id ? updatedMeeting : m
           );
           setMeetings(updatedMeetings);
       } else {
           console.error('Błąd podczas dodawania uczestnika:', response.status);
       }
   }

   async function handleRemoveParticipant(meeting) {
       if (!meeting || !meeting.id) return;

       const response = await fetch(`/api/meetings/${meeting.id}/participants/${username}`, {
           method: 'DELETE',
       });

       if (response.ok) {
           const updatedMeeting = await response.json();
           const updatedMeetings = meetings.map(m =>
               m.id === updatedMeeting.id ? updatedMeeting : m
           );
           setMeetings(updatedMeetings);
       }
   }

    return (
        <div>
            <h2>Zajęcia ({meetings.length})</h2>
            {
                addingNewMeeting
                    ? <NewMeetingForm onSubmit={handleNewMeeting}/>
                    : <button onClick={() => setAddingNewMeeting(true)}>Dodaj nowe spotkanie</button>
            }

            {meetings.length > 0 &&
                <MeetingsList
                    meetings={meetings}
                    username={username}
                    onDelete={handleDeleteMeeting}
                    onAddParticipant={handleAddParticipant}
                    onRemoveParticipant={handleRemoveParticipant}
                />
            }
        </div>
    );
}