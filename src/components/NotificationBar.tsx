// FILE: src/components/NotificationBar.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { FiMail, FiTwitter } from 'react-icons/fi'; // Social icons for the right side
import notificationsData from '@/data/notifications.json'; // Import your notifications data

const TYPING_SPEED = 70; // Milliseconds per character
const PAUSE_DURATION = 3000; // Milliseconds to pause at the end of a message

export function NotificationBar() {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const messages = notificationsData;
    const currentMessage = messages[currentMessageIndex];

    if (isTyping) {
      // Typing effect
      if (displayedText.length < currentMessage.length) {
        const typingTimer = setTimeout(() => {
          setDisplayedText(currentMessage.substring(0, displayedText.length + 1));
        }, TYPING_SPEED);
        return () => clearTimeout(typingTimer);
      } else {
        // Pause at the end of typing
        const pauseTimer = setTimeout(() => {
          setIsTyping(false);
        }, PAUSE_DURATION);
        return () => clearTimeout(pauseTimer);
      }
    } else {
      // Reset for next message
      const resetTimer = setTimeout(() => {
        setDisplayedText('');
        setIsTyping(true);
        setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
      }, 500); // Short delay before starting next message
      return () => clearTimeout(resetTimer);
    }
  }, [currentMessageIndex, displayedText, isTyping]);

  return (
    <div className="bg-gradient-to-r from-green-700 to-green-900 text-white py-2 px-6 flex items-center justify-between text-sm md:text-base font-medium z-40 relative">
      {/* Left side: Notification content */}
      <div className="flex-grow flex items-center overflow-hidden whitespace-nowrap">
        <span className="mr-3 animate-pulse text-yellow-300">📢</span>
        <span className="overflow-hidden text-ellipsis">{displayedText}</span>
      </div>

      {/* Right side: Social icons */}
      <div className="flex items-center space-x-4 ml-4 flex-shrink-0">
        <a
          href="mailto:contact@example.com"
          className="text-white hover:text-green-200 transition-colors duration-200"
          aria-label="Email"
        >
          <FiMail className="w-5 h-5" />
        </a>
        <a
          href="https://twitter.com/your_handle"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-green-200 transition-colors duration-200"
          aria-label="Twitter"
        >
          <FiTwitter className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
}
