import { useEffect, useState } from "react";

export function useFetch(url) {
  const [data, setdata] = useState(null);

  //  5 refatorando o  post
  const [config, setConfig] = useState(null);
  const [method, setMethod] = useState(null);
  const [callfetch, setCallFetch] = useState(null);

  // 06 loading
  const [loading, setLoading] = useState(false);

  // 7 tratando erro
  const [error, setError] = useState(null);

  const httpConfig = (data, method) => {
    if (method === "POST") {
      setConfig({
        method,
        Headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      setMethod(method);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      // 6 - loading

      setLoading(true);

      try {
        const res = await fetch(url);

        const json = await res.json();
        setdata(json);
      } catch (error) {
        setError("Houve um erro ao carregar os dados!");
      }

      setLoading(false);
    };

    fetchData();
  }, [url, callfetch]);

  // 5 - refatorando post

  useEffect(() => {
    const httpRequest = async () => {
      if (method === "POST") {
        let fetchOptions = [url, config];
        const res = await fetch(...fetchOptions);
        const json = await res.json();
        setCallFetch(json);
      }
    };

    httpRequest();
  }, [config, method, url]);
  return { data, httpConfig, loading , error };
}
