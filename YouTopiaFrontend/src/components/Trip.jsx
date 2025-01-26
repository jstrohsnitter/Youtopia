import { useState, useEffect } from "react";
import TripList from '/Users/macbook/code/ga/projects/Youtopia/YouTopiaFrontend/src/components/TripList.jsx';

const API_URL = '/api/TripItems';
const headers = {
    'Content-Type' : 'application/json',
}

function Trip() {
    const [trips, setTrips] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchTrips();
    }, []);

    const fetchTrips = () => {
        // const tripData = [
        //     { id: 3, name: "Test Trip", location: "Providence", start_Date: "2025-01-25", end_Date: "2025-01-25"}
        // ];
        // setTrips(tripData);
        fetch(API_URL)
            .then(response => response.json())
            .then(trips => setTrips(trips))
            .catch(error => setError(error));
    }

    const handleCreate = (trip) => {
        // const newTrip = {...trip, id: trip.length + 1};
        // setTrips([...trips, newTrip]);
        console.log(`add trip: ${JSON.stringify(trip)}`)

        fetch(API_URL , {
            method: 'POST',
            headers,
            body: JSON.stringify({name: trip.name, location: trip.location, start_Date: trip.start_Date, end_Date: trip.end_Date}),
        })
            .then(response => response.json())
            .then(returnedTrip => setTrips([...trips, returnedTrip]))
            .catch(error => setError(error));
    }

    const handleUpdate = (updatedTrip) => {
        // const updatedTrip = trips.map(tripToUpdate => tripToUpdate.id === trip.id ? trip : tripToUpdate)
        // setTrips(updatedTrip)
        console.log(`update trip: ${JSON.stringify(updatedTrip)}`)

        fetch(`${API_URL}/(id)?id=${updatedTrip.id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(updatedTrip),
        })
        .then(() => setTrips(trips.map(trip => trip.id === updatedTrip.id ? updatedTrip : trip)))
        .catch(error => setError(error));
    }

    const handleDelete = (id) => {
        // const updatedTrip = trips.filter(tripToDelete => tripToDelete.id !== id);
        // setTrips(updatedTrip);
        fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
            headers,
          })
            .then(() => setTrips(trips.filter(trip => trip.id !== id)))
            .catch(error => console.error('Error deleting item:', error));
        };

        return (
            <div>
                <TripList
                    trips={trips}
                    error={error}
                    onCreate={handleCreate}
                    onUpdate={handleUpdate}
                    onDelete={handleDelete}
                />
            </div>
        );
    }


export default Trip;