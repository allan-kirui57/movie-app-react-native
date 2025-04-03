import { useEffect, useState } from "react";

//Explanation:  
// This is a custom hook that fetches data from an API and manages the loading and error states.
// It takes a fetch function as an argument and returns the fetched data, loading state, error state, and a function to refetch the data.
// It also provides a reset function to clear the data and error states.
// It uses TypeScript generics to allow for any type of data to be fetched.
// It also allows for an optional auto-fetch feature, which will automatically fetch the data when the component mounts.
// The hook uses the useState and useEffect hooks from React to manage state and side effects.
// It is a reusable piece of code that can be used in multiple components to fetch data from an API.

const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);

            const result = await fetchFunction();

            setData(result);
        } catch (err) {
            setError(err instanceof Error ? err : new Error("An error occurred"));
        } finally {
            setLoading(false);
        }
    };

    const reset = () => {
        setData(null);
        setError(null);
    }

    useEffect(() => {
        if (autoFetch) {
            fetchData();
        }
    }, []);

    return { data, loading, error, fetchData, reset };
}
export default useFetch;