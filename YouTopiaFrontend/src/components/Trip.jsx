import { useState, useEffect } from "react";
import TripList from '/Users/macbook/code/ga/projects/Youtopia/YouTopiaFrontend/src/components/TripList.jsx';

function Trip() {
    const [trips, setTrips] = useState([]);

    useEffect(() => {
        fetchTrips();
    }, []);

    const fetchTrips = () => {
        const tripData = [
            { id: 3, name: "Test Trip", location: "Providence", start_Date: "2025-01-25", end_Date: "2025-01-25"}
        ];
        setTrips(tripData);
    }

    const handleCreate = (trip) => {
        const newTrip = {...trip, id: trip.length + 1};
        setTrips([...trips, newTrip]);
    }

    const handleUpdate = (trip) => {
        const updatedTrip = trips.map(tripToUpdate => tripToUpdate.id === trip.id ? trip : tripToUpdate)
        setTrips(updatedTrip)
    }

    const handleDelete = (id) => {
        const updatedTrip = trips.filter(tripToDelete => tripToDelete.id !== id);
        setTrips(updatedTrip);
    }

    return (
        <div>
            <TripList
                trips={trips}
                onCreate={handleCreate}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
            />
        </div>
    );
}

export default Trip;