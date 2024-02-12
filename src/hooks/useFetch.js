import React, { useEffect, useState } from "react";

const useFetch = (fetchFunction, initialValue) => {
  const [isFetching, setIsFetching] = useState();
  const [error, setError] = useState();
  const [fetchedData, setFetchData] = useState(initialValue);

  useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true);
      try {
        const data = await fetchFunction();
        setFetchData(data);
      } catch (error) {
        setError({ message: error.message || "Failed to fetch data" });
      }

      setIsFetching(false);
    };
    fetchData();
  }, [fetchFunction]);

  return {
    isFetching,
    error,
    fetchedData,
  };
};

export default useFetch;
