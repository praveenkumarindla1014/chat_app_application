import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";
import { CheckCircle2, ArrowLeft, Palette } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const THEME_LABELS = {
  chatdark: "Chat Dark ✨",
  dark: "Dark",
  light: "Light",
  night: "Night",
  dracula: "Dracula",
  dim: "Dim",
  luxury: "Luxury",
  synthwave: "Synthwave",
};

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div
      className="min-h-screen pt-20 px-4 pb-12"
      style={{ background: "#060b18" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-3xl mx-auto space-y-8"
      >
        {/* Back */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to chats
        </Link>

        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
            <Palette className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-white">
              Theme Settings
            </h1>
            <p className="text-slate-500 text-sm font-medium">
              Customize your chat interface theme
            </p>
          </div>
        </div>

        {/* Themes Grid */}
        <div
          className="p-6 rounded-2xl"
          style={{
            background: "rgba(13, 21, 38, 0.75)",
            border: "1px solid rgba(99, 102, 241, 0.15)",
            boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
          }}
        >
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-5">
            Select Theme
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {THEMES.map((t) => (
              <motion.button
                key={t}
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setTheme(t)}
                className="group relative flex flex-col items-center gap-3 p-4 rounded-2xl transition-all duration-200"
                style={{
                  background:
                    theme === t
                      ? "rgba(99, 102, 241, 0.15)"
                      : "rgba(255,255,255,0.03)",
                  border:
                    theme === t
                      ? "2px solid rgba(99, 102, 241, 0.5)"
                      : "1px solid rgba(255,255,255,0.07)",
                  boxShadow:
                    theme === t
                      ? "0 4px 20px rgba(99, 102, 241, 0.2)"
                      : "none",
                }}
              >
                {theme === t && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center shadow-lg"
                  >
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </motion.div>
                )}

                {/* Theme color preview */}
                <div
                  className="relative w-full aspect-video rounded-xl overflow-hidden shadow-inner"
                  data-theme={t}
                  style={{ border: "1px solid rgba(255,255,255,0.05)" }}
                >
                  <div className="absolute inset-0 grid grid-cols-4 gap-px p-1.5">
                    <div className="rounded-sm bg-primary shadow-sm" />
                    <div className="rounded-sm bg-secondary shadow-sm" />
                    <div className="rounded-sm bg-accent shadow-sm" />
                    <div className="rounded-sm bg-neutral shadow-sm" />
                  </div>
                </div>

                <span
                  className="text-xs font-semibold truncate w-full text-center"
                  style={{
                    color: theme === t ? "#818cf8" : "#475569",
                  }}
                >
                  {THEME_LABELS[t] || t.charAt(0).toUpperCase() + t.slice(1)}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Current theme preview */}
        <div
          className="p-5 rounded-2xl"
          style={{
            background: "rgba(13, 21, 38, 0.75)",
            border: "1px solid rgba(99, 102, 241, 0.12)",
          }}
        >
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">
            Live Preview
          </p>
          <div data-theme={theme} className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="p-4 bg-base-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-content text-xs font-bold">A</div>
                <div>
                  <p className="text-sm font-semibold text-base-content">Alex</p>
                  <p className="text-xs text-base-content/40">Online</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-start">
                  <div className="bg-base-200 text-base-content text-sm px-3 py-2 rounded-2xl max-w-xs">
                    Hey! How are you doing? 👋
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="bg-primary text-primary-content text-sm px-3 py-2 rounded-2xl max-w-xs">
                    I'm great! Just checking out this new theme ✨
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SettingsPage;