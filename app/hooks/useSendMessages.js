
import { useState } from "react";
import useConversation from "../store/useConversation";
import useUserStore from "../store/userStore";


const useSendMessage = () => {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation();

	const sendMessage = async (message) => {
		setLoading(true);
		try {
            console.log("sendMessage is working");

            if (!selectedConversation) {
                return "pick a conversation first!";
            }


			const res = await fetch(`/send/${selectedConversation._id}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ message }),
			});
			const data = await res.json();
			if (data.error) throw new Error(data.error);

			setMessages([...messages, data]);
            // setMessages((currentMessages) => [...currentMessages, data]);
		} catch (error) {
			alert(error.message);
            console.log(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { sendMessage, loading };
};

export default useSendMessage;
