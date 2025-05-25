export default function MeetingsList({meetings, onDelete}) {



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
            {
                meetings.map((meeting, index) => <tr key={index}>
                    <td>{meeting.title}</td>
                    <td>{meeting.description}</td>
                    <td>
                        <button type='button' onClick={() => onDelete(meeting)}>Usun</button>
                    </td>

                    <td>
                        <button type='button' onClick={() => onHandleAddParticipant({username})}>Dodaj mnie</button>
                    </td>
                    <td>
                        <button type='button' onClick={() => onDelete(meeting)}>Usuń mnie</button>
                    </td>
                </tr>)
            }
            </tbody>
        </table>
    );
}
