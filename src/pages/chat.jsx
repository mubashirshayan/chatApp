import React, { useEffect, useState, useRef, useMemo, useContext } from 'react'
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { GlobalContext } from '../context/context';
import { io } from 'socket.io-client';
import "../style/chat.css"
import {
    MainContainer,
    ChatContainer,
    MessageList,
    Message,
    MessageInput,
    ConversationHeader,
    Avatar,
    InfoButton,
    ConversationList,
    Conversation,
    Sidebar,
    Search,
    TypingIndicator,
    MessageSeparator,
    SendButton
} from "@chatscope/chat-ui-kit-react";
import { AiOutlineLogout } from "react-icons/ai"
import axios from 'axios';

export default function Chat() {
  
    const [messageInputValue, setMessageInputValue] = useState("");
    const [userData, setUserdata] = useState([]);
    const [selecteduserData, setSelecteduserData] = useState("");

    const [chat, setchat] = useState(null);
    const [chatId, setChatId] = useState("");
    const [responsive, setResponsive] = useState(null)
    const [chatUi,setChatui]=useState(false)
    let { state, dispatch } = useContext(GlobalContext);



    let logoutHandler = () => {
        try {
            console.log(
                "logout"
            )
            axios.post("http://localhost:8000/api/v1/user/logout", {}, {
                withCredentials: true,
            })

        } catch (err) {
            console.log(err)

        }
        dispatch({
            type: "USER_LOGOUT",
        })

    }
    const socket = io("http://localhost:8000");


    useEffect(() => {
        let getAlluser = async () => {
            try {
                await axios.get("http://localhost:8000/api/v1/users", {
                    withCredentials: true
                })
                    .then(res => setUserdata(res.data))
                    .catch(res => console.log(res))
            } catch (err) {
                console.log(err)

            }
        }
        getAlluser()

    }, [])
    let getAllmessage = async () => {
        if (!selecteduserData._id) return;

        try {

            const id = selecteduserData._id;

            let response = await axios.get(`http://localhost:8000/api/v1/message/${id}`,{
                withCredentials:true,
            })
                console.log(response)
      
            setchat(response.data.messagedata)
        } catch (err) {
            console.log(err.message)

        }
    }
    useEffect(() => {
    getAllmessage()

}, [selecteduserData])

    useEffect(() => {

        socket.on("connect", () => {
            console.log("socket id----", socket.id);
        })

        socket.on("connect_error", (err) => {
            console.log(`connect_error due to ${err.message}`);
        });
        
        console.log("subscribed: ", `${state.user.id}-${selecteduserData._id}`);
        socket.on(`${state.user.id}-${selecteduserData._id}`, (populatedData) => {
            console.log("message-received",populatedData)
           setchat(prev=>[...prev,populatedData])

       });

        return ()=>{
             socket.close()
            }
     

    }, [selecteduserData])

    function selectData(id) {

        setSelecteduserData(id)
        setResponsive(false)
        setChatui(true)
    }
    let messageSent = async () => {
        try {
               
            let response = await axios.post("http://localhost:8000/api/v2/message", {
                content: messageInputValue,
                recevier: selecteduserData._id,
            },{
                withCredentials:true,
               })
              //console.log(response)
                 getAllmessage()
            setMessageInputValue("");
          
       
            
       
        } catch(error) {
            console.log(error.message)
        }
    }

    




    let toggle = () => {
        setResponsive(true)
    }

    return (


        <div className='container' style={{
            height: "600px",
            position: "relative",
       
              
        }}>

            {responsive ?

                <div className='mainBox'>
                    <Sidebar position="left" scrollable={false} >
                        <ConversationHeader>
                            <Avatar src={"https://static-00.iconduck.com/assets.00/user-icon-2048x2048-ihoxz4vq.png"} name="Zoe" />
                            <ConversationHeader.Content userName={state.user.name} />
                            <ConversationHeader.Actions onClick={logoutHandler} >
                                <AiOutlineLogout size={26} />
                            </ConversationHeader.Actions>

                        </ConversationHeader>
                        <Search placeholder="Search..." />


                        <ConversationList>

                            {userData.map((v, i) => <Conversation key={i} name={v.name} lastSenderName="Lilly" onClick={() => {

                                selectData(v)
                            }}>
                                <Avatar src={"https://static-00.iconduck.com/assets.00/user-icon-2048x2048-ihoxz4vq.png"} name={v.name} status="available" />
                            </Conversation>)}
                        </ConversationList>
                    </Sidebar>
                    <div className='msgBox'><h5>Please select</h5></div>
                </div>

                :
                <MainContainer responsive>
                    <Sidebar position="left" scrollable={false}  >
                        <ConversationHeader>
                            <Avatar src={"https://static-00.iconduck.com/assets.00/user-icon-2048x2048-ihoxz4vq.png"} name="Zoe" />
                            <ConversationHeader.Content userName={state.user.name} />
                            <ConversationHeader.Actions onClick={logoutHandler} >
                                <AiOutlineLogout size={26} />
                            </ConversationHeader.Actions>

                        </ConversationHeader>
                        <Search placeholder="Search..." />


                        <ConversationList>

                            {userData.map((v, i) => <Conversation key={i} name={v.name} lastSenderName="Lilly" onClick={() => {

                                selectData(v)
                            }}>
                                <Avatar src={"https://static-00.iconduck.com/assets.00/user-icon-2048x2048-ihoxz4vq.png"} name={v.name} status="available" />
                            </Conversation>)}
                        </ConversationList>
                    </Sidebar>
                    { chatUi&&chatUi?
                    <ChatContainer>
                        <ConversationHeader>
                            <ConversationHeader.Back onClick={toggle} />
                            <Avatar src={"https://static-00.iconduck.com/assets.00/user-icon-2048x2048-ihoxz4vq.png"} name="Zoe" />
                            <ConversationHeader.Content userName={selecteduserData.name} />

                        </ConversationHeader>
                        <MessageList typingIndicator={<TypingIndicator content="Zoe is typing" />}>
                            <MessageSeparator content="Saturday, 30 November 2019" />
                     
                            {chat && chat.map((data, index) => state.user.id == data.sender._id ? <Message key={index} model={{
                                message: data.content,
                                sentTime: "15 mins ago",
                                sender: data.sender.name,
                                direction: "outgoing",
                                position: "single"
                            }}>
                                   
                            </Message> : <Message key={index} model={{
                                message: data.content,
                                sentTime: "15 mins ago",
                                sender: data.recevier.name,
                                direction: "incoming",
                                position: "single"
                            }}>
                             <Message.Header sender={data.sender.name}  />
                            </Message>
                            )}
                        

                        </MessageList>
                        <MessageInput placeholder="Type message here message" value={messageInputValue} onChange={val => setMessageInputValue(val)}
                            onSend={() => messageSent(selecteduserData._id)}
                        />

                    </ChatContainer>:<div>Please select a User Chat</div>}

                </MainContainer>
            }
        </div>


    )

}
