import React from "react";
import "./App.scss";
import { SelectActivity } from "./components/SelectActivity";
import { SelectPlace } from "./components/SelectPlace";
import { Button } from "@material-ui/core";

export function App(): JSX.Element {
  return (
    <div className="App">
      <p>After the corona epidemic, I want to</p>
      <SelectActivity />
      <p>in</p>
      <SelectPlace />

      <Button variant="outlined" color="primary">
        Create
      </Button>
    </div>
  );
}
