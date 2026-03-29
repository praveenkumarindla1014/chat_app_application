import { Check, CheckCheck } from "lucide-react";

/** Read receipt indicator: ✔ sent, ✔✔ delivered, ✔✔ blue = read */
const ReadReceipt = ({ status = "sent" }) => {
  if (status === "read") {
    return <CheckCheck className="size-3.5 text-blue-400" />;
  }
  if (status === "delivered") {
    return <CheckCheck className="size-3.5 text-base-content/30" />;
  }
  // sent
  return <Check className="size-3.5 text-base-content/30" />;
};

export default ReadReceipt;
