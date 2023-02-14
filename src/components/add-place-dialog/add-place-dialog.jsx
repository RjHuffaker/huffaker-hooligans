import React from 'react';

const AddPlaceDialog = ({activePlace, onTitleChange, onDescriptionChange, submitNewPlace}) => {
	return(
		<div className="InfoWindow">
      <h3>Add Place</h3>
      <div style={{"display": "flex", "flexDirection": "column"}}>
        <label htmlFor="place-title">Title</label>
        <input
            id="place-title"
            name="place-title"
            type="text"
            value={activePlace.title}
            onChange={onTitleChange}
        />
      </div>
      <div style={{"display": "flex", "flexDirection": "column"}}>
        <label htmlFor="place-description">Description</label>
        <textarea
            id="place-description"
            name="place-description"
            type="text"
            value={activePlace.description}
            onChange={onDescriptionChange}
        />
      </div>
      <div>
        <span htmlFor="place-lat">Latitude: {activePlace.position.lat}</span>
      </div>
      <div>
        <span htmlFor="place-lat">Longitude: {activePlace.position.lng}</span>
      </div>
      <button onClick={submitNewPlace}>Submit New Place</button>
    </div>
	)
}

export default AddPlaceDialog;