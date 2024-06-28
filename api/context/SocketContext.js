import {createContext} from "react";
import useUserStore from "../../app/store/userStore";

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const userId = useUserStore(state => state.userId);

    useEffect(() => {
        if (!userId) {
            console.log("User Id not found");
            if (socket) {
                socket.close();
                setSocket(null);
            }
            return
        }

        const socket = io("http://localhost:5000");

        setSocket(socket);

        return () => socket.close();
    })
    return (
        
        <SocketContext.Provider value = {{}}>
            {children}
        </SocketContext.Provider>
    )
}