/** Date separator between messages — "Today", "Yesterday", "Mar 28, 2026" */
const DateSeparator = ({ date }) => {
  return (
    <div className="flex items-center gap-4 my-6 px-4">
      <div className="flex-1 h-px bg-base-300" />
      <span className="text-[11px] font-semibold text-base-content/40 bg-base-100 px-3 py-1 rounded-full border border-base-300 shadow-sm tracking-wide uppercase">
        {date}
      </span>
      <div className="flex-1 h-px bg-base-300" />
    </div>
  );
};

export default DateSeparator;
