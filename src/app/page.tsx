"use client";

import HomeComponent from "@/components/HomeComponent";
import { Button } from "@/components/ui/button";
import React, { memo, useEffect, useState } from "react";

const HomePage: React.FC = () => {
  // let obj: any = {
  //   property_1: "111",
  //   property_2: "222",
  // };
  const [obj, setObj] = useState<any>({
    property_1: "111",
    property_2: "222",
  });
  const [primitive, setPrimitive] = useState<any>(1);

  useEffect(() => {
    console.log("inside use effect");
  }, [obj.property_1]);

  const onClickButton = () => {
    obj.property_1 = "3333";
    // setObj({
    //   ...obj,
    //   // property_2: "222",
    // });

    setPrimitive(1);

    console.log("after set time out", obj);
  };

  // console.log("object", obj);
  console.log("Dâta out side", obj);

  return (
    <div>
      HomePage
      <HomeComponent msg={obj.property_2} />
      <Button variant={"outline"} onClick={onClickButton}>
        Click click
      </Button>
    </div>
  );
};

export default memo(HomePage);
