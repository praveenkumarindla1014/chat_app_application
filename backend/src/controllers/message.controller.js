import User from "../models/user.model.js";
import Message from "../models/message.model.js";

export const getUserForSidebar = async (req,res) => {
  try{
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("fullName email profilePicture");
     res.status(200).json(filteredUsers);
  }catch(error){
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }


};


export const getmessages = async (req,res) => {
    try{
        const{id:UserToChatId} = req.params;
        const senderId = req.user._id;
        const messages = await Message.find({
            $or:[
                {senderId:senderId,receiverId:UserToChatId},
                {senderId:UserToChatId,receiverId:senderId}
            ] 
        })

        res.status(200).json(messages);
    }catch(error){
        console.error(error.message);
        res.status(500).json({ message: "Internal server error" });
    }

            
};

export const sendMessage = async (req,res) => {
    try{
        const{text,image} = req.body;
        const {id:receiverId} = req.params;
        const senderId = req.user._id;
          
        let imageUrl;

        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            sender:senderId,
            receiverId,
            text,
            Image:imageUrl
        });
        await newMessage.save();

        //to do: real time funcationallity
        res.status(201).json(newMessage);


    }catch(error){
        console.error(error.message);
        res.status(500).json({ message: "Internal server error" });
        
       
        }
};

