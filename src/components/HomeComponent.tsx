import React from "react";

type Props = {
  msg: string;
};

const HomeComponent = ({ msg }: Props) => {
  console.log("Home component re-render", msg);

  return <div>HomeComponent</div>;
};

export default React.memo(HomeComponent);
