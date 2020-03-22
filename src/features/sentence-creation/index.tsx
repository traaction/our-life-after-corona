import { Grid } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import uuidV4 from "uuid/v4";
import { ActivityScreen } from "./components/ActivityScreen";
import { PlaceScreen } from "./components/PlaceScreen";
import "./index.scss";

const COOKIE_NAME = "our-life-after-corona_user-uuid";

export function SentenceCreation(): JSX.Element {
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
    <Grid
      container
      direction="row"
      justify="space-between"
      alignItems="center"
      spacing={2}
      className="SentenceCreation"
    >
      <Grid item xs={2} />

      <Grid item xs={12}>
        <Card>
          <div className="SentenceCreation__content">
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
        </Card>
      </Grid>
      <Grid item xs={2} />
    </Grid>
  );
}
