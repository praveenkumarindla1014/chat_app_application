const MessageSkeleton = () => {
  const skeletonMessages = Array(6).fill(null);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {skeletonMessages.map((_, idx) => {
        const isSender = idx % 2 === 0;
        return (
          <div
            key={idx}
            className={`chat ${isSender ? "chat-end" : "chat-start"}`}
          >
            <div className="chat-image avatar">
              <div className="size-9 rounded-xl bg-base-300/50 skeleton-shimmer" />
            </div>

            <div className="chat-header mb-1">
              <div className="h-2 w-10 bg-base-300/50 rounded-full skeleton-shimmer" />
            </div>

            <div
              className={`chat-bubble w-[200px] h-[60px] max-w-sm rounded-2xl skeleton-shimmer
                ${isSender ? "bg-primary/20 rounded-br-md" : "bg-base-200/50 rounded-bl-md"}`}
            />
          </div>
        );
      })}
    </div>
  );
};

export default MessageSkeleton;