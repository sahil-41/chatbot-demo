import { getChatsByUserID } from "@/actions/chats";
import chatsGlobalStore from "@/store/chats-store";
import usersGlobalStore from "@/store/user-store";
import { message, Spin } from "antd";
import classNames from "classnames";
import { Plus, Trash, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { deleteChat } from "../../actions/chats";

function SideBar({ setShowSidebar = () => {} }: { setShowSidebar?: any }) {
  const [hoveredChatId, setHoveredChatId] = useState<string>("");
  const [loading = false, setLoading] = useState<boolean>(false);
  const { loggedInUserData } = usersGlobalStore() as any;
  const [selectedChatForDelete, setSelectedChatForDelete] = useState<any>(null);
  const { userChats, setUserChats, selectedChat, setSelectedChat } =
    chatsGlobalStore() as any;
  const getChats = async () => {
    try {
      setLoading(true);
      const response = await getChatsByUserID(loggedInUserData._id);
      if (response.success) {
        setUserChats(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error("Failed to fetch chats");
    } finally {
      setLoading(false);
    }
  };
  const deleteChatHandler = async (chatId: string) => {
    try {
      setSelectedChatForDelete(chatId);
      const response = await deleteChat(chatId);
      if (response.success) {
        const updatedChats = userChats.filter(
          (chat: any) => chat._id !== chatId
        );
        setUserChats(updatedChats);
        if (selectedChat?._id === chatId) {
          setSelectedChat(null);
        }
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      console.log("im in");
      setSelectedChatForDelete(null);
    }
  };
  useEffect(() => {
    getChats();
  }, []);
  return (
    <div className="w-80 bg-sidebar p-5 flex flex-col justify-between h-full">
      <div className="flex-1">
        <div className="p-2">
          <div
            onClick={() => {
              setSelectedChat(null);
              setShowSidebar(false);
            }}
            className="flex gap-2 border border-gray-200 border-solid text-gray-200 p-2 rounded-sm w-max text-sm items-center cursor-pointer"
          >
            <Plus size={15} />
            New Chat
          </div>
        </div>
        <div className="flex flex-col mt-7">
          <h1 className="text-sm text-gray-300 font-bold p-2">
            your recent chats
          </h1>
          {loading && (
            <div className="text-sm text-gray-300 font-bold p-2">
              <Spin size="small" />
            </div>
          )}
          {!loading && userChats?.length === 0 && (
            <span className="text-gray-400 text-xs px-2 py-5">
              No chats found
            </span>
          )}
          <div className="flex flex-col gap-3 mt-7 ">
            {userChats?.map((chat: any) => (
              <div
                key={chat._id}
                className={classNames(
                  "cursor-pointer flex justify-between items-center p-2 hover:bg-gray-500 bg-opacity-30",
                  {
                    "bg-gray-600 rounded bg-opacity-30":
                      selectedChat?._id === chat._id,
                  }
                )}
                onMouseEnter={() => setHoveredChatId(chat._id)}
                onMouseLeave={() => setHoveredChatId("")}
              >
                <span
                  className="text-sm text-gray-300"
                  onClick={() => {
                    setSelectedChat(chat);
                    console.log("selected", selectedChat);
                  }}
                >
                  {chat.title}
                </span>
                {hoveredChatId === chat._id && (
                  <Trash2
                    size={15}
                    className="text-gray-300"
                    onClick={() => deleteChatHandler(chat._id)}
                  />
                )}
                {selectedChatForDelete === chat._id && (
                  <Spin size="small" className="text-gray-300" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-1 p-3">
        <span className="text-gray-400 text-xs">Designed & Developed by</span>
        <hr 
        className="border border-gray-500 border-solid w-10"
        />
         <span className="text-gray-400 text-xs">Sahil Rathore(Specialist Programmer)</span>
      </div>
    </div>
  );
}

export default SideBar;
