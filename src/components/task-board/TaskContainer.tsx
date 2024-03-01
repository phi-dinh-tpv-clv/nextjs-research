"use client";
import React, { useEffect, useState } from "react";
import TaskPanel from "./TaskPanel";
import { StatusInfo } from "./GqlType";
import { useGQLQuery } from "@/utils/hooks/useGQLQuery";
import { QUERY_ALL_STATUS } from "@/utils/common/constants";
import { GET_ALL_STATUS } from "@/graphql/queries/getAllStatus";
import { GetAllStatusQuery } from "@/gql/graphql";
import Spinner from "../Spinner/Spinner";

type Props = {};

const TaskContainer = (props: Props) => {
  const [statusPanels, setStatusPanels] = useState<StatusInfo[]>([]);
  const { data, isLoading } = useGQLQuery(QUERY_ALL_STATUS, GET_ALL_STATUS, {});

  useEffect(() => {
    if (data) {
      const { statusList } = data as GetAllStatusQuery;
      setStatusPanels(statusList);
    }
  }, [data]);

  return (
    <div className="grid h-full w-full grid-cols-4 grid-rows-1 gap-6">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {statusPanels.map((status) => (
            <TaskPanel key={status.id} status={status} />
          ))}
        </>
      )}
    </div>
  );
};

export default TaskContainer;
