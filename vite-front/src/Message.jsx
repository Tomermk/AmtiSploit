import React from "react";
import useSWR from "swr";
import fetcher from "./fetcher";


export default function Message() {
    const { data:result, error} = useSWR("http://localhost:6000/api",fetcher);

    if(error) return (<p>
        An error has occured.
            </p>);
    if(!result) return (<p>
            Loading...
            </p>);
    return (<p>{result.message}</p>);

}