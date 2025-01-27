import { useState } from 'react';
import TripCard from './TripCard';

function TripList ({ trips, onCreate, onUpdate, onDelete, error }){
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        location: '',
        start_Date: '',
        end_Date: ''
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
        setFormData({ id: '', name: '', location: '', start_Date: '', end_Date: ''})
    }

    const handleEdit = (trip) => {
        setEditingId(trip.id);
        setFormData({
            id: trip.id,
            name: trip.name,
            location: trip.location,
            start_Date: trip.start_Date,
            end_Date: trip.end_Date,
        });
    }

    const handleCancelEdit = () => {
        setEditingId(null);
        setFormData({        
            id: '',
            name: '',
            location: '',
            start_Date: '',
            end_Date: ''
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
                /><br/>
                    <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={formData.location}
                    onChange={handleFormChange}
                    className='locationInput'
                /><br/>
                <input
                    type="date"
                    name="start_Date"
                    placeholder="Start Date"
                    value={formData.start_Date}
                    onChange={handleFormChange}
                    className='startDateInput'
                /><br/>
                <input
                    type="date"
                    name="end_Date"
                    placeholder="End Date"
                    value={formData.end_Date}
                    onChange={handleFormChange}
                    className='endDateInput'
                /><br/>
                <button type='submit' className='submitButton'>{editingId ? 'Update' : 'Create'}</button>
                {editingId && <button type='button' onClick={handleCancelEdit}>Cancel</button>}
            </form>
            {error && <div>{error.message}</div>}
            <h2 className='tripListHeader'>Trips</h2>
            {/* <ul className='tripList'>
                {trips.map(trip => (
                    <li key={trip.id}>
                        <div className='tripListItemDiv'>
                            {trip.name}<br/>
                            {trip.location}<br/>
                            {trip.start_Date}<br/>
                            {trip.end_Date}<br/>
                        </div>
                        <div className='editDeleteTripButtonContainer'><button onClick={() => handleEdit(trip)}>Edit</button>
                        <button onClick={() => onDelete(trip.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul> */}
            <TripCard onDelete={onDelete} handleEdit={handleEdit} trips={trips}/>
        </div>
        </>
    )
}

export default TripList