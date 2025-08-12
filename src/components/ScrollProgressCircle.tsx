import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react"; // or any icon lib you use

export default function ScrollProgressCircle() {
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (scrollTop / docHeight) * 100;
      setScrollPercent(Math.round(scrolled));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg 
        flex flex-col items-center justify-center transition-all duration-300 
        ${scrollPercent > 5 ? "bg-sky-500 hover:bg-sky-600 text-white" : "bg-gray-100 text-gray-600"}`}
    >
      {scrollPercent > 5 && <ChevronUp className="w-5 h-5 mb-1" />}
      <span className="font-bold text-xs">{scrollPercent}%</span>
    </button>
  );
}
