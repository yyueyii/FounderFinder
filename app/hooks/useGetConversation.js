import { useState, useEffect } from 'react';
import useUserStore from '../store/userStore';

const useGetConversations = () => {
    const userId = useUserStore((state) => state.userId);
    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        
        const getConversations = async () => {
            setLoading(true);

            try {

                if (userId) {
                    console.log("userId from get convo : " + userId);
                } else {
                    console.log("no user id found");
                    return 
                }

                // const res = await fetch(`/${userId}`);
                const res = await fetch(`https://founderfinder-1-cfmd.onrender.com/api/6673ea5eb2cc17eca589fb0a`);

                if (!res.ok) {
                    throw new Error(`[in useGetConversations] HTTP error! Status: ${res.status}`);
                }

                const data = await res.json();

                if (data.error) {
                    throw new Error(data.error);
                }

                console.log("This is the data from useConversation: " + data)

                setConversations(data);
            } catch (error) {
                alert(error.message);
                console.log(error.message);
            } finally {
                setLoading(false);
            }
        };

        getConversations();
    },[]);

    return { loading, conversations };
}

export default useGetConversations;