import React, {useState} from 'react';

const ViewPlaceDialog = ({activePlace, onTitleChange, onDescriptionChange, onSaveClick, onDeleteClick}) => {
    const [editMode, setEditMode] = useState(false)
    
    return(
		editMode ?
        <div className="InfoWindow" key={activePlace.id}>
            <h3>Edit Place</h3>
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
            <button onClick={()=>{setEditMode(false); onSaveClick()}}>Save Changes</button>
            <button onClick={()=>{setEditMode(false); onDeleteClick()}}>Delete Place</button>
            {editMode}
        </div>
        :
        <div className="InfoWindow" key={activePlace.id}>
            <h3>{activePlace.title}</h3>
            <p>{activePlace.description}</p>
            <button onClick={()=>setEditMode(true)}>Edit Place</button>
            {editMode}
        </div>
	)
}

export default ViewPlaceDialog;