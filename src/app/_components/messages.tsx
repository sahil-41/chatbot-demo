import CustomLayout from "@/custom_layout";
import usersGlobalStore from "@/store/user-store";
import { Button, Spin, message } from "antd";
import { Bot, Check, Copy, Share } from "lucide-react";
import React, { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import ShareMessage from "./share-message";

function Messages({
  messages,
  isLoading,
}: {
  messages: any[];
  isLoading: boolean;
}) {
  const { loggedInUserData }: any = usersGlobalStore();
  const [copiedMessage, setCopiedMessage] = React.useState<string>("");
  const [messageToShare, setMessagesToShare] = React.useState<string>("");
  const [openShareModel, setOpenShareModel] = React.useState<boolean>(false);
  const messagesRef = React.useRef<any>(null);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  if (!isLoading && messages.length === 0) {
    return (
      <div className="h-[75vh] flex items-center justify-center">
        <div className="flex flex-col text-gray-400 text-sm font-bold">
          <span>Hey, {loggedInUserData.name}</span>
          <span>
            I am SP-Bot, your personal assistance, How can I help you today?
          </span>
        </div>
      </div>
    );
  }
  const onCopy = (content:string) => {
    try {
      navigator.clipboard.writeText(content);
      message.success("content copied to clipboard")
      setCopiedMessage(content);
      
    } catch (error) {
      message.error("Failed to copy content")
    }
  };
  return (
    <div
      className="flex flex-col gap-7 text-gray-300 mt-7 text-sm h-[75vh] overflow-auto"
      ref={messagesRef}
    >
      {messages.map((message, index) => {
        if (message.role == "user") {
          return (
            <div key={index} className="flex justify-end mr-5">
              <span className="bg-gray-800 p-3 rounded">{message.content}</span>
            </div>
          );
        }
        return (
          <div key={index} className="flex gap-2">
            <div className="border borrder-gray-300 border-solid rounded-full h-6 w-6 flex items-center justify-center">
              <Bot size={16} />
            </div>
            <div className="flex-1 flex flex-col gap-5">
              <ReactMarkdown>{message.content}</ReactMarkdown>
              <div className="flex -ml-4">
              <Button ghost className="border-none"
              onClick={()=> copiedMessage !== message.content && onCopy(message.content)}
              >
                {copiedMessage === message.content? <Check size={16} className="text-gray-500"/>: <Copy size={16} className="text-gray-500"/>}
              </Button>
              <Button ghost className="border-none"
              onClick={()=>{
                setMessagesToShare(message.content);
                setOpenShareModel(true);
              }}
              >
                <Share size={16} className="text-gray-500" />
              </Button>
              </div>
            </div>
          </div>
        );
      })}

      <div className="flex justify-start">
        {isLoading && <Spin size="small" />}
      </div>
      {openShareModel && <ShareMessage open={openShareModel} setOpen={setOpenShareModel} messageToShare={messageToShare}/>}
    </div>
  );
}

export default Messages;
