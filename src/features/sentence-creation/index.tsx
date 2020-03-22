import { Grid, IconButton } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CheckIcon from "@material-ui/icons/Check";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { INewSentence } from "types";
import { createNewSentence } from "utils/api";
import uuidV4 from "uuid/v4";
import { SelectActivity } from "./components/SelectActivity";
import { SelectPlace } from "./components/SelectPlace";
import "./index.scss";

const COOKIE_NAME = "our-life-after-corona_user-uuid";

export function SentenceCreation(): JSX.Element {
  const [cookies, setCookie] = useCookies([COOKIE_NAME]);

  const [activityUuid, setActivityUuid] = useState<string>("");
  const [placeUuid, setPlaceUuid] = useState<string>("");

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
            <>
              After the corona pandemic, I want to do...
              <SelectActivity {...{ setActivityUuid }} />
              in <SelectPlace setSelectedPlaceUuid={setPlaceUuid} />
            </>

            <IconButton
              aria-label="next"
              color="primary"
              disabled={!activityUuid || !placeUuid}
              onClick={() => {
                const newSentence: INewSentence = {
                  userUuid: cookies[COOKIE_NAME],
                  activityUuid,
                  placeUuid,
                  userLocation: {
                    // TODO: Add user location
                    lat: 0,
                    long: 0
                  }
                };
                createNewSentence(newSentence);
              }}
            >
              <CheckIcon fontSize="large" />
            </IconButton>
          </div>
        </Card>
      </Grid>

      <Grid item xs={2} />
    </Grid>
  );
}
