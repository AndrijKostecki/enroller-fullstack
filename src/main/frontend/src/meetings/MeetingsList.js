export default function MeetingsList({
    meetings,
    username,
    onDelete,
    onAddParticipant,
    onRemoveParticipant
})

{
function isUserInMeeting(meeting) {
    return meeting.participants.some(p => p.login === username);
}

    return (
        <table>
            <thead>
                <tr>
                    <th>Nazwa spotkania</th>
                    <th>Opis</th>
                    <th>Akcje</th>
                    <th>Dodawanie</th>
                    <th>Usuwanie</th>
                </tr>
            </thead>
            <tbody>
                {meetings.map((meeting, index) => (
                    <tr key={index}>
                        <td>{meeting.title}</td>
                        <td>{meeting.description}</td>
                        <td>
                            <button type="button" onClick={() => onDelete(meeting)}>Usuń</button>
                        </td>
                        <td>
                            <button
                                type="button"
                                onClick={() => onAddParticipant(username, meeting)}
                                disabled={isUserInMeeting(meeting)}
                            >
                                Dodaj mnie
                            </button>
                        </td>
                        <td>
                            <button
                                type="button"
                                onClick={() => onRemoveParticipant(meeting)}
                                disabled={!isUserInMeeting(meeting)}
                            >
                                Usuń mnie
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}