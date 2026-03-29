import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";
import { CheckCircle2 } from "lucide-react";

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0f1c] via-[#0d1627] to-[#0a0f1c] text-slate-200 pt-24 px-4 pb-12">
      <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* Header Section */}
        <div className="flex flex-col gap-2 relative">
          <div className="absolute -top-10 -left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
          <h2 className="text-4xl font-extrabold tracking-tight text-white drop-shadow-sm">Theme Settings</h2>
          <p className="text-blue-200/60 font-medium text-lg max-w-xl">
            Customize your chat interface. Select from our curated list of beautiful themes below.
          </p>
        </div>

        {/* Themes Grid */}
        <div className="bg-[#11192b]/80 backdrop-blur-xl border border-blue-900/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 relative z-10">
            {THEMES.map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`
                  group relative flex flex-col items-center gap-3 p-4 rounded-2xl transition-all duration-300
                  ${theme === t 
                    ? "bg-blue-600/20 border-2 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.15)] shadow-blue-500/20 translate-y-[-2px]" 
                    : "bg-[#0a0f1c]/50 border border-slate-800/60 hover:bg-blue-900/20 hover:border-blue-700/50 hover:shadow-lg"
                  }
                `}
              >
                {theme === t && (
                  <div className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full p-0.5 shadow-lg animate-bounce-short">
                    <CheckCircle2 size={16} />
                  </div>
                )}
                
                <div className="relative w-full aspect-video rounded-lg overflow-hidden ring-1 ring-white/10 shadow-inner" data-theme={t}>
                  <div className="absolute inset-0 grid grid-cols-4 gap-px p-1.5 bg-black/20">
                    <div className="rounded-sm bg-primary shadow-sm"></div>
                    <div className="rounded-sm bg-secondary shadow-sm"></div>
                    <div className="rounded-sm bg-accent shadow-sm"></div>
                    <div className="rounded-sm bg-neutral shadow-sm"></div>
                  </div>
                  {/* Glass overlay for depth */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
                </div>
                
                <span className={`text-sm font-semibold tracking-wide truncate w-full text-center transition-colors
                  ${theme === t ? "text-blue-400" : "text-slate-400 group-hover:text-blue-300"}
                `}>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </span>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default SettingsPage;