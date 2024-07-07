"use client";

import { useParams, useRouter } from "next/navigation";

import { useOrigin } from "@/hooks/use-origin";
import ApiAlert from "./api=alert";

interface ApiListProps {
  entityName: string;
  entityIdName: string;
}

export function ApiList({ entityName, entityIdName }: ApiListProps) {
  const router = useRouter();
  const origin = useOrigin();
  const params = useParams();

  //const baseURL = `${origin}/api/${params.storeId}/${entityName}`;
  const baseURL = `${origin}/api/${params.storeId}`;

  return (
    <>
      <ApiAlert
        title="GET"
        description={`${baseURL}/${entityName}`}
        variant="public"
      />
      <ApiAlert
        title="GET"
        description={`${baseURL}/${entityName}/{${entityIdName}}`}
        variant="public"
      />
      <ApiAlert
        title="POST"
        description={`${baseURL}/${entityName}`}
        variant="admin"
      />
      <ApiAlert
        title="PATCH"
        description={`${baseURL}/${entityName}/{${entityIdName}}`}
        variant="admin"
      />
      <ApiAlert
        title="DELETE"
        description={`${baseURL}/${entityName}/{${entityIdName}}`}
        variant="admin"
      />
    </>
  );
}
