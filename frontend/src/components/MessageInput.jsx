import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      // Clear form
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="p-4 w-full bg-base-100/50 backdrop-blur-md border-t border-base-300">
      {imagePreview && (
        <div className="mb-4 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="relative group/preview">
            <img
              src={imagePreview}
              alt="Preview"
              className="size-24 object-cover rounded-2xl border-2 border-primary/20 shadow-md group-hover:scale-105 transition-transform"
            />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 size-6 rounded-full bg-base-300 hover:bg-error hover:text-white
              flex items-center justify-center transition-colors shadow-lg"
              type="button"
            >
              <X className="size-4" />
            </button>
          </div>
          <p className="text-xs text-base-content/50 font-medium italic">Image preview</p>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-3">
        <div className="flex-1 flex gap-2 bg-base-200/50 rounded-2xl p-1.5 border border-base-300 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
          <button
            type="button"
            className={`hidden sm:flex btn btn-ghost btn-circle btn-sm
                     ${imagePreview ? "text-primary" : "text-base-content/40 hover:text-primary"}`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image size={20} />
          </button>
          
          <input
            type="text"
            className="flex-1 bg-transparent border-none focus:outline-none focus:ring-0 px-2 text-sm sm:text-base placeholder:text-base-content/30"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
        </div>
        
        <button
          type="submit"
          className="btn btn-primary btn-circle shadow-lg shadow-primary/20 hover:shadow-primary/40 active:scale-90 transition-all"
          disabled={!text.trim() && !imagePreview}
        >
          <Send size={20} className="ml-0.5" />
        </button>
      </form>
    </div>
  );
};
export default MessageInput;