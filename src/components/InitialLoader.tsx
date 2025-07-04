"use client";
import { useEffect, useState } from "react";

const InitialLoader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // simulate loading for ~5 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white dark:bg-gray-950">
      <div className="animate-spin rounded-full h-20 w-20 border-4 border-blue-500 border-t-transparent"></div>
      {/* 👇 You can replace this with a fancier animation */}
    </div>
  );
};

export default InitialLoader;
