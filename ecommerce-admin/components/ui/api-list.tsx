"use client"

import { useOrigin } from "@/hooks/use-origin";
import { useParams } from "next/navigation";
import { ApiAlert } from "./api-alert";

interface ApiListProps{
    entityName:string;
    entityIDName: string;
}

export const ApiList:React.FC<ApiListProps> = ({
    entityName,
    entityIDName
})=>{
    const params= useParams();
    const origin= useOrigin();

    const baseURL= `${origin}/api/${params.storeID}`
    return(
        <>
            <ApiAlert 
            title="GET" 
            variant="public"
            description={`${baseURL}/${entityName}`}
            />
            <ApiAlert 
            title="GET" 
            variant="public"
            description={`${baseURL}/${entityName}/{${entityIDName}}`}
            />
            <ApiAlert 
            title="POST" 
            variant="admin"
            description={`${baseURL}/${entityName}`}
            />
            <ApiAlert 
            title="PATCH" 
            variant="admin"
            description={`${baseURL}/${entityName}/{${entityIDName}}`}
            />
            <ApiAlert 
            title="DELETE" 
            variant="admin"
            description={`${baseURL}/${entityName}/{${entityIDName}}`}
            />
        </>
    )
}