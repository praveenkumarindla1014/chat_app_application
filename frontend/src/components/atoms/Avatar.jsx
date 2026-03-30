import OnlineIndicator from "./OnlineIndicator";
import { User as UserIcon } from "lucide-react";

/** Avatar with optional online status dot */
const Avatar = ({
  src,
  alt = "User",
  size = "md",
  isOnline = false,
  className = "",
}) => {
  const sizeClasses = {
    sm: "size-8",
    md: "size-10",
    lg: "size-12",
    xl: "size-16",
    "2xl": "size-24",
  };

  const indicatorSize = {
    sm: "xs",
    md: "sm",
    lg: "sm",
    xl: "md",
    "2xl": "lg",
  };

  return (
    <div className={`relative shrink-0 ${className}`}>
      {src ? (
        <img
          src={src}
          alt={alt}
          className={`${sizeClasses[size]} rounded-2xl object-cover border border-base-300 shadow-sm transition-transform duration-200 hover:scale-105`}
          loading="lazy"
        />
      ) : (
        <div className={`${sizeClasses[size]} rounded-2xl border border-base-300 bg-base-200 flex items-center justify-center shadow-sm`}>
          <UserIcon className="size-1/2 opacity-40 text-base-content" />
        </div>
      )}
      {isOnline && (
        <OnlineIndicator
          size={indicatorSize[size]}
          className="absolute bottom-0 right-0"
        />
      )}
    </div>
  );
};

export default Avatar;
