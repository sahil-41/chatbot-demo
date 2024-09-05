"use server";


import chatModel from "@/models/chat-model";

export const saveNewChat = async (payload: any) => {
  try {
    console.log("Payload being saved:", payload);
    const response = await chatModel.create(payload);
    console.log("Response after saving chat:", response);
    return {
      data: JSON.parse(JSON.stringify(response)),
      success: true,
    };
  } catch (error: any) {
    return {
      message: error.message,
      success: false,
    };
  }
};
export const getChatsByUserID = async (userId: string) => {
  
  try {
    const response = await chatModel.find({ user: userId });
    return {
      data: JSON.parse(JSON.stringify(response)),
      success: true,
    };
  } catch (error: any) {
    return {
      message: error.message,
      success: false,
    };
  }
};
export const updateChat = async ({
    chatId = "",
    messages = [],
  }: {
    chatId: string;
    messages: any[];
  }) => {
    try {
      // Update the chat document by chatId and update the messages field
      const response = await chatModel.findByIdAndUpdate(
        chatId,
        { messages }, // Use the correctly defined messages variable
        { new: true } // Return the updated document
      );
      return {
        data: JSON.parse(JSON.stringify(response)),
        success: true,
      };
    } catch (error: any) {
      return {
        message: error.message,
        success: false,
      };
    }
  };
  

export const deleteChat = async (chatId: string) => {
  try {
    const response = await chatModel.findByIdAndDelete(chatId);
    return {
      data: JSON.parse(JSON.stringify(response)),
      success: true,
    };
  } catch (error: any) {
    return {
      message: error.message,
      success: false,
    };
  }
};
