import { motion } from "framer-motion";

const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-base-200/50 p-12 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 -left-20 w-72 h-72 bg-secondary/5 rounded-full blur-[100px]" />

      <div className="max-w-md text-center relative z-10">
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[...Array(9)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08, type: "spring", stiffness: 200 }}
              className={`aspect-square rounded-2xl bg-primary/5 border border-primary/10
                ${i % 2 === 0 ? "animate-pulse" : ""}
                hover:bg-primary/10 transition-colors duration-300 cursor-default
              `}
            />
          ))}
        </div>
        <h2 className="text-2xl font-bold mb-3 tracking-tight">{title}</h2>
        <p className="text-base-content/50 leading-relaxed">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;