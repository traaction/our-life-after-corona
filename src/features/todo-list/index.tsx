import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import React, { useEffect, useState } from "react";
import { ISentence, UUID } from "types";
import { getSentencesForUser } from "utils/api";

interface IProps {
  userUuid: UUID;
}

export function TodoList({ userUuid }: IProps): JSX.Element {
  const [userSentences, setUserSentences] = useState<ISentence[]>([]);

  useEffect(() => {
    if (userUuid) {
      getSentencesForUser(userUuid).then(sentences => {
        setUserSentences(sentences);
      });
    }
  }, [userUuid]);

  return (
    <List>
      {userSentences.map(
        (sentence): JSX.Element => {
          return (
            <ListItem key={sentence.uuid}>
              <ListItemText
                primary={sentence.activity.name}
                secondary={sentence.place.name}
              />
            </ListItem>
          );
        }
      )}
    </List>
  );
}
