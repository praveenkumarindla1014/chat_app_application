import { useChatStore } from "../store/useChatStore";
import { useUIStore } from "../store/useUIStore";

import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();
  const { isMobile } = useUIStore();

  return (
    <div
      className="h-screen pt-16"
      style={{ background: "#060b18" }}
    >
      <div className="flex h-full overflow-hidden">
        {/* Sidebar — always visible on desktop, toggleable on mobile */}
        {(!isMobile || !selectedUser) && <Sidebar />}

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {!selectedUser ? (
            !isMobile && <NoChatSelected />
          ) : (
            <ChatContainer />
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;