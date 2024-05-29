import { useState } from "react";

interface PostResponse {
    [key: string]: any;
}

interface UsePostReturn {
    postData: (path: string, body: any, token: string) => Promise<void>;
    response: PostResponse[] | null;
    isLoading: boolean | null;
    error: string | null;
}

export const usePost = (): UsePostReturn => {
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean | null>(null);
    const [response, setResponse] = useState<PostResponse[] | null>(null);

    const postData = async (path: string, body: any, token: string): Promise<void> => {
        console.log("path:", path, "body:", body);
        setIsLoading(true);

        try {
            const res = await fetch(path, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(body),
            });

            const json = await res.json();

            if (!res.ok) {
                setError(json.error);
            } else {
                setResponse((prevData) => prevData ? [...prevData, json] : [json]);
            }
        } catch (error: any) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return { postData, response, isLoading, error };
};