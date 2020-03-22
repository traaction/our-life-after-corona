import React, { useState, useEffect } from "react";
import "./App.scss";
import { ActivityScreen } from "./components/ActivityScreen";
import { PlaceScreen } from "./components/PlaceScreen";

export function App(): JSX.Element {
  const [showActivityScreen, setShowActivityScreen] = useState<boolean>(true);

  const [activityUuid, setActivityUuid] = useState<string>("");
  const [placeUuid, setPlaceUuid] = useState<string>("");

  useEffect(() => {
    console.log({ showActivityScreen, activityUuid, placeUuid });
  }, [showActivityScreen, activityUuid, placeUuid]);

  return (
    <div className="App">
      {showActivityScreen && (
        <ActivityScreen
          setActivity={setActivityUuid}
          onNext={() => {
            setShowActivityScreen(false);
          }}
        />
      )}
      {!showActivityScreen && <PlaceScreen {...{ setPlaceUuid }} />}
    </div>
  );
}
