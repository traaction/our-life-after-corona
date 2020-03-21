import React, { useState, useEffect } from "react";
import "./App.scss";
import { ActivityScreen } from "./components/ActivityScreen";
import { PlaceScreen } from "./components/PlaceScreen";

export function App(): JSX.Element {
  const [showActivityScreen, setShowActivityScreen] = useState<boolean>(true);

  const [userName, setUserName] = useState<string>("");
  const [activityUuid, setActivityUuid] = useState<string>("");
  const [placeUuid, setPlaceUuid] = useState<string>("");

  useEffect(() => {
    console.log({ showActivityScreen, userName, activityUuid, placeUuid });
  }, [showActivityScreen, userName, activityUuid, placeUuid]);

  return (
    <div className="App">
      {showActivityScreen && (
        <ActivityScreen
          setUserName={setUserName}
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
