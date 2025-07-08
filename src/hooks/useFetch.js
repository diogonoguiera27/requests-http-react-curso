import { useEffect, useState } from "react";

export function useFetch(url) {
    const [data, setdata] = useState(null)

    useEffect(( )=>{
        const fetchData = async () => {

            const res = await fetch(url)

            const json  = await res.json()

            setdata(json)
        }

        fetchData();
    },[url])

    return { data };
}