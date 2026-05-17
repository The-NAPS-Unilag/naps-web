import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useInstallPrompt } from "../hooks/useInstallPrompt";
import { Share, ArrowDownToLine, X } from "lucide-react";

function IOSInstallSheet({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-md bg-white rounded-t-2xl px-6 pt-6 pb-10 shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>
        <h2 className="text-lg font-GeneralSans-Semibold text-main_grey mb-4">
          Install NAPS on your iPhone
        </h2>
        <ol className="space-y-4 text-[15px] text-gray-600 font-GeneralSans">
          <li className="flex items-start gap-3">
            <span className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-full bg-main text-white text-xs flex items-center justify-center font-bold">1</span>
            <span>
              Tap the <Share size={15} className="inline mb-0.5 text-blue-500" />{" "}
              <strong>Share</strong> button at the bottom of your browser.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-full bg-main text-white text-xs flex items-center justify-center font-bold">2</span>
            <span>
              Scroll down and tap <strong>"Add to Home Screen"</strong>.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-full bg-main text-white text-xs flex items-center justify-center font-bold">3</span>
            <span>
              Tap <strong>"Add"</strong> in the top-right corner.
            </span>
          </li>
        </ol>
      </div>
    </div>
  );
}

function Welcome() {
  const navigate = useNavigate();
  const { accessToken } = useAuth();
  const { prompt, canInstall, isIOS } = useInstallPrompt();
  const [showIOSSheet, setShowIOSSheet] = useState(false);

  useEffect(() => {
    if (accessToken) {
      navigate("/dashboard");
    }
  }, [accessToken, navigate]);

  const handleInstall = () => {
    if (isIOS) {
      setShowIOSSheet(true);
    } else {
      prompt();
    }
  };

  return (
    <>
      {showIOSSheet && <IOSInstallSheet onClose={() => setShowIOSSheet(false)} />}
      <div className="w-full h-screen bg-white flex flex-col items-center justify-center font-GeneralSans">
        <div className="text-main_grey text-[56px] font-GeneralSans-Semibold">
          <span>Welcome to the </span>
          <span className="text-main">Psychology Hub!</span>
        </div>
        <div className="text-main_grey text-[32px] font-GeneralSans-Medium">
          <span>Dive into </span>
          <span className="text-main">Learning, Collaboration </span>
          <span>and </span>
          <span className="text-main">Opportunities</span>
        </div>
        <div className="mt-14 space-y-6 flex flex-col">
          <Button
            variant="ghost"
            size="default"
            onClick={() => navigate("/signup")}
            className="bg-main text-[18px] rounded-lg text-white w-[350px]"
          >
            Sign up
          </Button>
          <Button
            variant="secondary"
            size="default"
            onClick={() => navigate("/login")}
            className="bg-white text-[18px] rounded-lg text-main border border-main w-[350px]"
          >
            Sign in
          </Button>
          {canInstall && (
            <Button
              variant="ghost"
              size="default"
              onClick={handleInstall}
              className="bg-white text-[18px] rounded-lg text-gray-500 border border-gray-200 w-[350px] gap-2"
            >
              <ArrowDownToLine size={18} />
              Install App
            </Button>
          )}
        </div>
      </div>
    </>
  );
}

export default Welcome;
