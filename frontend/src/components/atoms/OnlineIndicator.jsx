/** Online indicator — animated green dot with glow */
const OnlineIndicator = ({ size = "sm", className = "" }) => {
  const sizeClasses = {
    xs: "size-2",
    sm: "size-3",
    md: "size-3.5",
    lg: "size-4",
  };

  return (
    <span
      className={`
        ${sizeClasses[size]} bg-green-500 rounded-full 
        ring-2 ring-base-100 online-glow
        ${className}
      `}
    />
  );
};

export default OnlineIndicator;
