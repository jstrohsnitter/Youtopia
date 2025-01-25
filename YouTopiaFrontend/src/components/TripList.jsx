import { useState } from 'react';

function TripList ({ trips, onCreate, onUpdate, onDelete, error }){
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        location: '',
        start_date: '',
        end_date: ''
    });
    const [editingId, setEditingId] = useState(null);

    const handleFormChange = (event) => {
        setFormData(prevData => ({
            ...prevData, [event.target.name] : event.target.value,
        }))
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (editingId) {
            onUpdate(formData);
            setEditingId(null)
        } else {
            onCreate(formData)
        }
        setFormData({ id: '', name: '', location: '', start_date: '', end_date: ''})
    }

    const handleEdit = (trip) => {
        setEditingId(trip.id);
        setFormData({
            id: trip.id,
            name: trip.name,
            location: trip.location,
            start_date: trip.start_date,
            end_date: trip.end_date,
        });
    }

    const handleCancelEdit = () => {
        setEditingId(null);
        setFormData({        
            id: '',
            name: '',
            location: '',
            start_date: '',
            end_date: ''
        })
    }

    return (
        <>
        <div className="tripListDiv">
            <h2 className='newTripHeader'>New Trip</h2>
            <form onSubmit={handleSubmit} className='newTripForm'>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleFormChange}
                    className='nameInput'
                />
                    <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={formData.location}
                    onChange={handleFormChange}
                    className='locationInput'
                />
                <input
                    type="date"
                    name="start_date"
                    placeholder="Start Date"
                    value={formData.start_date}
                    onChange={handleFormChange}
                    className='startDateInput'
                />
                <input
                    type="date"
                    name="end_date"
                    placeholder="End Date"
                    value={formData.end_date}
                    onChange={handleFormChange}
                    className='endDateInput'
                />
                <button type='submit' className='submitButton'>{editingId ? 'Update' : 'Create'}</button>
                {editingId && <button type='button' onClick={handleCancelEdit}>Cancel</button>}
            </form>
            {error && <div>{error.message}</div>}
            <h2 className='tripListHeader'>Trips</h2>
            <ul className='tripList'>
                {trips.map(trip => (
                    <li key={trip.id}>
                        <div className='tripListItemDiv'>
                            {trip.name}
                            {trip.location}
                            {trip.start_date}
                            {trip.end_date}
                        </div>
                        <div className='editDeleteTripButtonContainer'><button onClick={() => handleEdit(trip)}>Edit</button>
                        <button onClick={() => onDelete(trip.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
        </>
    )
}

export default TripList