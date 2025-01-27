function TripCard({trips, onDelete, handleEdit}) {
    return (
        <>
        {/* <h1>Trip Card</h1> */}
        {trips.map(trip => (
            <>
            <h2 key={trip.id}>{trip.name}</h2>
            <h3>Location: {trip.location}</h3>
            <h3>Start Date: {trip.start_Date}</h3>
            <h3>End Date: {trip.end_Date}</h3>
            <div className='editDeleteTripButtonContainer'><button onClick={() => handleEdit(trip)}>Edit</button>
            <button onClick={() => onDelete(trip.id)}>Delete</button>
            </div>
            </>
        ))}
        </>
    )
}

export default TripCard