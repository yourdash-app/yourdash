import React from "react";
import useResource from "@yourdash/csi/useResource.js"
import { acsi } from "../../../../meta.yourdash";
import { EndpointStoreHomePromotedApplications } from "../../../../../shared/types/endpoints/home/promotedApplications"

const PromotedApplications: React.FC = () => {
    const promotedApplications = useResource(() => acsi.getJson<EndpointStoreHomePromotedApplications>("/home/promotedApplications")) || []

    return <>
        PromotedApplications
    </>
}

export default PromotedApplications