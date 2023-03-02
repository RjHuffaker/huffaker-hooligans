import { createContext, useState, useEffect } from 'react';

import {
  getAllDocuments,
  createDocument,
  readDocument,
  updateDocument,
  deleteDocument,
  // addDocuments
} from '../config/firebase';

// import { JourneysListData } from '../journeysListData';

export const JourneysContext = createContext({
  Journeys: []
});

export const JourneysProvider = ({ children }) => {
  const [journeys, setJourneys] = useState([]);

  const [selectedJourney, setSelectedJourney] = useState({});

  const [editableJourney, setEditableJourney] = useState({});

  useEffect(() => {
    // addDocuments("journeys", JourneysListData);
    getJourneys();
  },[]);

  const getJourneys = async () => {
    const journeyList = await getAllDocuments('journeys');
    setJourneys(journeyList);
  }

  const selectJourney = (journey) => {
    journey.selected = !journey.selected;
    const index = journeys.findIndex(obj => obj.id === journey.id);
    
    if (index !== -1) {
      setJourneys(oldJourneys => {
        const newJourneys = [...oldJourneys];
        newJourneys[index] = journey;
        return [...newJourneys];
      });
    }
  }

  const createJourney = async (journey) => {
    const newJourney = await createDocument('journeys', journey).then(res => res);;
    setJourneys([...journeys, newJourney]);
    return newJourney;
  }

  const readJourney = async (journeyId) => {
    return await readDocument("journeys", journeyId);
  }

  const updateJourney = async (journey) => {
    const journeyToUpdate = await updateDocument('journeys', journey);

    const index = journeys.findIndex(obj => obj.id === journeyToUpdate.id);
    
    if (index !== -1) {
      setJourneys(oldJourneys => {
        const newJourneys = [...oldJourneys];
        newJourneys[index] = journeyToUpdate;
        return [...newJourneys];
      });
    } else {
      console.error('Journey not found in memory');
    }
  }

  const deleteJourney = async (journey) => {
    const deletedJourneyId = await deleteDocument('journeys', journey);
    const index = journeys.findIndex(obj => obj.id === deletedJourneyId);
    if (index !== -1) {
      setJourneys((journeys) => journeys.filter((obj) => obj.id !== deletedJourneyId));
    } else {
      console.error('Journey not found in memory');
    }
  }

  const value = {
    journeys,
    setJourneys,
    selectJourney,
    selectedJourney,
    setSelectedJourney,
    editableJourney,
    setEditableJourney,
    createJourney,
    readJourney,
    updateJourney,
    deleteJourney
  };

  return (
    <JourneysContext.Provider value={value}>
      {children}
    </JourneysContext.Provider>
  );

}