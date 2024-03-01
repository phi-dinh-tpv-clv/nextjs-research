import React from "react";
import { Skeleton } from "../ui/skeleton";

const Spinner = () => {
  return (
    <>
      <Skeleton className="mt-5 h-full w-full rounded-lg">
        <div className="mt-8 flex h-full w-full items-start justify-center text-xl italic">Loading</div>
      </Skeleton>
      <Skeleton className="mt-5 h-full w-full rounded-lg">
        <div className="mt-8 flex h-full w-full items-start justify-center text-xl italic">Loading</div>
      </Skeleton>
      <Skeleton className="mt-5 h-full w-full rounded-lg">
        <div className="mt-8 flex h-full w-full items-start justify-center text-xl italic">Loading</div>
      </Skeleton>
      <Skeleton className="mt-5 h-full w-full rounded-lg">
        <div className="mt-8 flex h-full w-full items-start justify-center text-xl italic">Loading</div>
      </Skeleton>
    </>
  );
};

export default Spinner;
