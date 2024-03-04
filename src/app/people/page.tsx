"use client";

import React from "react";
import PeopleDataTable from "./data-table";
import { columns } from "./column";
import { people } from "@/utils/tanstack-table/people";

type Props = {
  //
};

const People = (props: Props) => {
  return (
    <div className="container mx-auto py-10">
      <PeopleDataTable columns={columns} data={people} />
    </div>
  );
};

export default People;
