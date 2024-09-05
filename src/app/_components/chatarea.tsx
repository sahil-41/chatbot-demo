import React, { useEffect } from "react";
import { UserButton } from "@clerk/nextjs";
import { Menu, Send } from "lucide-react";
import SideBar from "./sidebar";
import { Button, Drawer, message } from "antd";
import { useChat } from "ai/react";
import Messages from "./messages";
import { saveNewChat, updateChat } from "@/actions/chats";
import chatsGlobalStore from "@/store/chats-store";
import usersGlobalStore from "@/store/user-store";
import { stringify } from 'querystring';
import messages from '@/app/_components/messages';

function ChatArea() {
  
  const [showSidebar, setShowSidebar] = React.useState(false);
  const { messages, input, handleInputChange, handleSubmit, isLoading, setMessages } = useChat({
    api: "api/chat",
    initialMessages:[]
  });
    
  const { selectedChat, setSelectedChat, setUserChats,userChats}: any = chatsGlobalStore();
  const { loggedInUserData } = usersGlobalStore() as any;
 
  const addorUpdateChat = async () => {
    try {
      if (!selectedChat) {

        const response = await saveNewChat({
          
          user: loggedInUserData._id,
          messages: messages,
          title: messages[0].content,
        });
        if (response.success){
          setSelectedChat(response.data);
          setUserChats([response.data, ...userChats])
          console.log(userChats)
        }
      }else {
        await updateChat({chatId:selectedChat._id,messages})
      }
    } catch (error: any) {
      message.error(error.stringify)
    } 
 
  };

  useEffect(() => {
    if (messages.length > 0) addorUpdateChat(); // Call the function
    console.log(messages)
}, [messages]);


useEffect(()=>{
  if(selectedChat){
    setMessages(selectedChat.messages);
  }else{
    setMessages([])
  }
},[selectedChat])

  return (
    <div className="bg-chatarea h-full p-5 flex flex-col">
      <div className="flex justify-between">
        <div className="flex tem-center gap-2">
          <Menu
            className="text-white flex lg:hidden cursor-pointer"
            onClick={() => setShowSidebar(true)}
          />
          <h1 className="text-xl font-bold text-yellow-400">SP-Bot</h1>
        </div>
        <UserButton />
      </div>
      {/* AI Realated code */}
      <div className="flex flex-col justify-between flex-1">
        <Messages messages={messages} isLoading={isLoading} />

        <form onSubmit={handleSubmit} className="relative">
          <input
            name="prompt"
            value={input}
            onChange={handleInputChange}
            id="input"
            placeholder="Type Something..."
            autoComplete="off"
            required
            className="bg-sidebar p-5 w-full focus:outline-none focus:border-gray-500 focus:border rounded text-gray-300 text-sm"
          />
          <Button htmlType="submit"
          disabled={input.length===0}
          ghost className="absolute right-1 bottom-4 border-none">
            <Send className={`${input.length>0? "text-gray-300":"text-gray-700"}`} 
            
            />
          </Button>
        </form>
      </div>
      {/* {showSidebar && <SideBar setShowSidebar={setShowSidebar}/>} */}
      {showSidebar && (
        <Drawer
          onClose={() => setShowSidebar(false)}
          open={showSidebar}
          placement="left"
        >
          <SideBar setShowSidebar={setShowSidebar} />
        </Drawer>
      )}
    </div>
  );
 
}

export default ChatArea;
