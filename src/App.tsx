import Container from "@material-ui/core/Container";
import React, { useEffect, useState } from "react";
import uuidV4 from "uuid/v4";
import { SentenceCreation } from "./features/sentence-creation";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

import { useCookies } from "react-cookie";
import { TodoList } from "features/todo-list";

const COOKIE_NAME = "our-life-after-corona_user-uuid";

export function App(): JSX.Element {
  const [cookies, setCookie] = useCookies([COOKIE_NAME]);
  const [userUuid, setUserUuid] = useState<string>("");

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
      <BrowserRouter>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/list">Your ToDos</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/list">
            <TodoList {...{ userUuid }} />
          </Route>
          <Route exact path="/">
            <SentenceCreation {...{ userUuid }} />
          </Route>
        </Switch>
      </BrowserRouter>
    </Container>
  );
}
