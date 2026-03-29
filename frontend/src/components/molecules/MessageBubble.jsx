import ReadReceipt from "./ReadReceipt";
import { formatMessageTime } from "../../lib/utils";

/** Individual message bubble — sender (right) vs receiver (left) */
const MessageBubble = ({ message, isSender, showAvatar = true, avatarSrc }) => {
  return (
    <div className={`chat ${isSender ? "chat-end" : "chat-start"} message-enter`}>
      {showAvatar && (
        <div className="chat-image avatar">
          <div className="size-9 rounded-xl border border-base-300">
            <img
              src={avatarSrc || "/avatar.png"}
              alt="avatar"
              className="object-cover"
              loading="lazy"
            />
          </div>
        </div>
      )}

      <div className="chat-header mb-1">
        <time className="text-[10px] opacity-40 ml-1 font-medium">
          {formatMessageTime(message.createdAt)}
        </time>
      </div>

      <div
        className={`chat-bubble flex flex-col max-w-xs sm:max-w-sm md:max-w-md
          ${
            isSender
              ? "bg-primary text-primary-content rounded-2xl rounded-br-md shadow-lg shadow-primary/15"
              : "bg-base-200 text-base-content rounded-2xl rounded-bl-md border border-base-300"
          }
        `}
      >
        {message.image && (
          <img
            src={message.image}
            alt="Attachment"
            className="rounded-xl mb-2 max-w-[250px] shadow-md cursor-pointer hover:opacity-90 transition-opacity"
            loading="lazy"
          />
        )}
        {message.text && (
          <p className="text-sm leading-relaxed break-words">{message.text}</p>
        )}

        {/* Timestamp + Read Receipt for sender */}
        {isSender && (
          <div className="flex items-center justify-end gap-1 mt-1">
            <span className={`text-[10px] ${isSender ? "opacity-60" : "opacity-40"}`}>
              {formatMessageTime(message.createdAt)}
            </span>
            <ReadReceipt status={message.status || "sent"} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
