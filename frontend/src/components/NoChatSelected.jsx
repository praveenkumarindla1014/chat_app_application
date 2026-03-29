import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50 backdrop-blur-sm">
      <div className="max-w-md text-center space-y-6">
        {/* Icon Display */}
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div
              className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center
             justify-center animate-bounce shadow-inner"
            >
              <MessageSquare className="w-10 h-10 text-primary " />
            </div>
            {/* Pulsing glow effect */}
            <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full -z-10 animate-pulse" />
          </div>
        </div>

        {/* Welcome Text */}
        <div className="space-y-2">
          <h2 className="text-3xl font-extrabold tracking-tight">Welcome to <span className="text-primary italic">Chatty!</span></h2>
          <p className="text-base-content/60 font-medium">
            Stay connected with your friends and family in real-time. Pick a contact from the sidebar to jump into a conversation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NoChatSelected;