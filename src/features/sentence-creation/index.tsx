import { Grid, IconButton } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CheckIcon from "@material-ui/icons/Check";
import React, { useState } from "react";
import { INewSentence, UUID } from "types";
import { usePosition } from "use-position";
import { createNewSentence } from "utils/api";
import { SelectActivity } from "./components/SelectActivity";
import { SelectPlace } from "./components/SelectPlace";
import "./index.scss";

interface IProps {
  userUuid: UUID;
}
export function SentenceCreation({ userUuid }: IProps): JSX.Element {
  const { latitude, longitude } = usePosition();

  const [activityUuid, setActivityUuid] = useState<string>("");
  const [placeUuid, setPlaceUuid] = useState<string>("");

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
                let lat: number = 0;
                if (latitude) {
                  lat = latitude;
                }

                let long: number = 0;
                if (longitude) {
                  long = longitude;
                }

                const newSentence: INewSentence = {
                  userUuid,
                  activityUuid,
                  placeUuid,
                  userLocation: { lat, long }
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
