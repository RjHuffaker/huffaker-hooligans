import { useContext } from 'react';

import { JourneysContext } from '../../contexts/journeys-context';

import SelectableList from "../selectable-list/selectable-list";


const JourneyToggle = () => {

  const {
    journeys,
    setJourneys,
    createJourney,
    updateJourney,
    deleteJourney,
    selectJourney,
    selectedJourney,
    setSelectedJourney
  } = useContext(JourneysContext);

  return (
    <>
      <SelectableList
        itemList={journeys}
        selectItem={selectJourney}
      />
    </>
  );
}

export default JourneyToggle;