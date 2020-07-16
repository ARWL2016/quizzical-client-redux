import React from "react";
import { Message } from "semantic-ui-react";

const ErrorMessage = ({ error }) => {
  return (
    <Message negative compact>
      <Message.Header>Error</Message.Header>
      <p>{error}</p>
    </Message>
  );
};

export default ErrorMessage;
