import Container from "@material-ui/core/Container";
import React from "react";
import { SentenceCreation } from "./features/sentence-creation";

export function App(): JSX.Element {
  return (
    <Container maxWidth="sm">
      <SentenceCreation />
    </Container>
  );
}
