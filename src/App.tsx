import React, { useState, useEffect } from "react";
import "./App.scss";
import { ActivityScreen } from "./components/ActivityScreen";
import { PlaceScreen } from "./components/PlaceScreen";
import uuidV4 from "uuid/v4";
import { useCookies } from "react-cookie";

const COOKIE_NAME = "our-life-after-corona_user-uuid";

export function App(): JSX.Element {
  const [showActivityScreen, setShowActivityScreen] = useState<boolean>(true);
  const [cookies, setCookie] = useCookies([COOKIE_NAME]);

  const [activityUuid, setActivityUuid] = useState<string>("");
  const [placeUuid, setPlaceUuid] = useState<string>("");

  useEffect(() => {
    console.log({
      showActivityScreen,
      activityUuid,
      placeUuid,
      userUuid: cookies[COOKIE_NAME]
    });
  }, [showActivityScreen, activityUuid, placeUuid, cookies]);

  // Setup cookie with userID
  useEffect(() => {
    if (!cookies[COOKIE_NAME]) {
      setCookie(COOKIE_NAME, uuidV4());
    }
  }, [cookies, setCookie]);

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
