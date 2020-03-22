import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import { TodoList } from "features/todo-list";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Route, Switch, useHistory } from "react-router-dom";
import uuidV4 from "uuid/v4";
import { SentenceCreation } from "./features/sentence-creation";

const COOKIE_NAME = "our-life-after-corona_user-uuid";

const HOME_PATH = "/";
const LIST_PATH = "/list";

export function App(): JSX.Element {
  const [cookies, setCookie] = useCookies([COOKIE_NAME]);
  const [userUuid, setUserUuid] = useState<string>("");
  const [currentTabIndex, setCurrentTabIndex] = useState<number>(0);

  const history = useHistory();

  useEffect(() => {
    let nextPath: string;
    switch (currentTabIndex) {
      case 1: {
        nextPath = LIST_PATH;
        break;
      }

      case 0:
      default: {
        nextPath = HOME_PATH;
        break;
      }
    }
    history.push(nextPath);
  }, [currentTabIndex, history]);

  // Setup cookie with userID
  useEffect(() => {
    if (!cookies[COOKIE_NAME]) {
      const newUuid = uuidV4();
      setCookie(COOKIE_NAME, newUuid);
      setUserUuid(newUuid);
    } else {
      setUserUuid(cookies[COOKIE_NAME]);
    }
  }, [cookies, setCookie]);

  return (
    <Container maxWidth="sm">
      <Paper square>
        <Tabs
          value={currentTabIndex}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          onChange={(event: React.ChangeEvent<{}>, nextIndex: number) => {
            setCurrentTabIndex(nextIndex);
          }}
          aria-label="disabled tabs example"
        >
          <Tab label="Home" />
          <Tab label="Your ToDos" />
        </Tabs>
      </Paper>

      <Switch>
        <Route path="/list">
          <TodoList {...{ userUuid }} />
        </Route>
        <Route exact path="/">
          <SentenceCreation {...{ userUuid }} />
        </Route>
      </Switch>
    </Container>
  );
}
