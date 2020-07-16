import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";

const LoadingComponent = ({ message = "Loading..." }) => {
  return (
    <Dimmer active inverted>
      <Loader inverted>{message}</Loader>
    </Dimmer>
  );
};

export default LoadingComponent;
