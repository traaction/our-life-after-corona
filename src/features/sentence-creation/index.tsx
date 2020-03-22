import { Grid, IconButton } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import Snackbar from "@material-ui/core/Snackbar";
import CheckIcon from "@material-ui/icons/Check";
import Alert from "@material-ui/lab/Alert";
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

  const [shouldDisplaySnackbar, setShouldDisplaySnackbar] = useState<boolean>(
    false
  );

  async function onCreateButtonClick(): Promise<void> {
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

    await createNewSentence(newSentence);

    setShouldDisplaySnackbar(true);
    setActivityUuid("");
    setPlaceUuid("");
  }

  return (
    <>
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
                onClick={onCreateButtonClick}
              >
                <CheckIcon fontSize="large" />
              </IconButton>
            </div>
          </Card>
        </Grid>

        <Grid item xs={2} />
      </Grid>
      <CreationSnackbar
        {...{ shouldDisplaySnackbar, setShouldDisplaySnackbar }}
      />
    </>
  );
}

function CreationSnackbar({
  shouldDisplaySnackbar,
  setShouldDisplaySnackbar
}: {
  shouldDisplaySnackbar: boolean;
  setShouldDisplaySnackbar: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  function onCloseHandler(): void {
    setShouldDisplaySnackbar(false);
  }
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center"
      }}
      open={shouldDisplaySnackbar}
      autoHideDuration={6000}
      onClose={onCloseHandler}
    >
      <Alert onClose={onCloseHandler} severity="success">
        ToDo was created.
      </Alert>
    </Snackbar>
  );
}
