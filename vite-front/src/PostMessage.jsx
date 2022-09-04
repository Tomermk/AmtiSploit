import React from "react";
import useSWR from "swr";

const fetcher = (url) => fetch(url,{ method: "post" }).then((res) => res.json());

export default function Message() {
    const { data, error} = useSWR("http://localhost:6000/post",fetcher);

    if(error) return (<p>
        An error has occured.
            </p>);
    if(!data) return (<p>
            Loading...
            </p>);
    return (<p>{data.message}</p>);

}