"use client";

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fontSize = isMobile ? 10 : 14;
    const columns = Math.floor(canvas.width / fontSize);
    
    // Using a mix of characters that look techie
    const chars = "01せかい で もtとも うつくしく みりきてきな ばしょ それは せかい で もtとも きょうりょくで ゆうりょくな ぶきです。";
    // const chars = "013 Happy songkarn day be safe 2025";
    
    const drops: number[] = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = 1;
    }

    // Reduced speed for more subtle effect
    const draw = () => {
      // Semi-transparent background for trail effect
      context.fillStyle = 'rgba(0, 10, 20, 0.05)';
      context.fillRect(0, 0, canvas.width, canvas.height);

      // Green text
      context.fillStyle = '#0fa';
      context.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        // Random character to print
        const text = chars[Math.floor(Math.random() * chars.length)];
        
        // x = i * fontSize, y = drops[i] * fontSize
        context.fillText(text, i * fontSize, drops[i] * fontSize);

        // Add randomness to the character transparency
        if (Math.random() > 0.975) {
          context.fillStyle = '#0fa'; // Bright green for some characters
        } else {
          // Varying shades of green
          const shade = Math.floor(Math.random() * 100) + 155;
          context.fillStyle = `rgba(0, ${shade}, ${Math.floor(shade/2)}, 0.8)`;
        }

        // Reset drop back to top when it reaches the bottom or randomly
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        // Increment y coordinate
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 35);
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('resize', checkMobile);
    };
  }, [isMobile]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-0"
    />
  );
};

export default function LandingPage() {
  const [typedText, setTypedText] = useState('');
  const fullText = "Hello, I'm Suphakin Thiwong.";
  const [cursorVisible, setCursorVisible] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Typing effect
    if (typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.substring(0, typedText.length + 1));
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      // When typing is complete, show the content
      setTimeout(() => {
        setShowContent(true);
      }, 500);
    }
  }, [typedText]);

  // Cursor blinking effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen w-full bg-black text-white font-mono relative overflow-hidden">
      <MatrixRain />
      
      <div className="relative z-10 w-full min-h-screen flex flex-col justify-center items-center p-4">
        <div className="bg-black/80 backdrop-blur-sm p-8 rounded-lg border border-green-500/30 shadow-2xl max-w-3xl w-full">
          <div className="mb-6 h-16 flex items-center">
            <h1 className="text-2xl md:text-4xl font-bold text-green-400">
              {typedText}
              <span className={`inline-block w-3 h-6 bg-green-400 ml-1 ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}></span>
            </h1>
          </div>

          {showContent && (
            <div className="space-y-6 fade-in">
              <div className="text-lg text-green-300/90">
                <p className="mb-4">Software developer specializing in high-performance data processing systems and web application development.</p>
                <p>8+ years of building secure, scalable solutions with expertise in Python/Django, PHP, Rust, and payment gateway integrations.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                <div className="terminal-box">
                  <div className="terminal-header">
                    <div className="terminal-title">Skills</div>
                  </div>
                  <div className="terminal-content">
                    <ul className="space-y-1 text-sm">
                      <li><span className="text-green-400">$</span> Python, PHP, Rust, JavaScript, Go</li>
                      <li><span className="text-green-400">$</span> Django, FastAPI, Laravel, Express</li>
                      <li><span className="text-green-400">$</span> AWS, GCP, Azure, Docker, K8s</li>
                      <li><span className="text-green-400">$</span> Payment Gateways (SCB, K-Bank)</li>
                      <li><span className="text-green-400">$</span> Database & DevOps</li>
                      <li><span className="text-green-400">$</span> Cybersecurity & IoT Systems</li>
                    </ul>
                  </div>
                </div>

                <div className="terminal-box">
                  <div className="terminal-header">
                    <div className="terminal-title">Experience</div>
                  </div>
                  <div className="terminal-content">
                    <ul className="space-y-1 text-sm">
                      <li><span className="text-green-400">$</span> Backend Developer @ ViaBus</li>
                      <li><span className="text-green-400">$</span> Sr. Backend Developer @ VeNoob</li>
                      <li><span className="text-green-400">$</span> Full-Stack Developer @ Conicle</li>
                      <li><span className="text-green-400">$</span> Payment Systems Developer</li>
                      <li><span className="text-green-400">$</span> Team Leadership & Scrum Master</li>
                      <li><span className="text-green-400">$</span> High-Volume Data Processing</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 mt-8">
                <Link href="https://raspv.babylvoob.org/profile" className="matrix-button">
                  <span className="button-glow"></span>
                  <span className="relative z-10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    View Full Profile
                  </span>
                </Link>
                <Link href="https://github.com/suphakin-th" className="matrix-button">
                  <span className="button-glow"></span>
                  <span className="relative z-10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    GitHub
                  </span>
                </Link>
              </div>

              <div className="typing-effect mt-8 text-center text-green-400">
                <p className="text-xs md:text-sm">[Enter the Matrix to discover more about my skills and projects]</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .fade-in {
          animation: fadeIn 1s ease-in forwards;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .typing-effect {
          overflow: hidden;
          white-space: nowrap;
          border-right: 2px solid transparent;
          animation: typing 3s steps(40, end), blink-caret 0.75s step-end infinite;
        }
        
        @keyframes typing {
          from { width: 0 }
          to { width: 100% }
        }
        
        @keyframes blink-caret {
          from, to { border-color: transparent }
          50% { border-color: #10B981 }
        }
        
        .terminal-box {
          background-color: rgba(0, 0, 0, 0.7);
          border: 1px solid rgba(16, 185, 129, 0.5);
          border-radius: 6px;
          overflow: hidden;
        }
        
        .terminal-header {
          background-color: rgba(16, 185, 129, 0.2);
          padding: 8px 12px;
          display: flex;
          align-items: center;
        }
        
        .terminal-title {
          font-weight: bold;
          text-transform: uppercase;
          font-size: 0.8rem;
          letter-spacing: 1px;
          color: rgba(16, 185, 129, 0.9);
        }
        
        .terminal-content {
          padding: 12px;
        }
        
        .matrix-button {
          position: relative;
          display: inline-block;
          background-color: rgba(0, 0, 0, 0.7);
          color: #10B981;
          border: 1px solid rgba(16, 185, 129, 0.5);
          padding: 0.75rem 1.5rem;
          border-radius: 4px;
          overflow: hidden;
          transition: all 0.3s ease;
          font-weight: 500;
        }
        
        .matrix-button:hover {
          background-color: rgba(16, 185, 129, 0.2);
          border-color: rgba(16, 185, 129, 0.8);
          box-shadow: 0 0 15px rgba(16, 185, 129, 0.5);
        }
        
        .button-glow {
          position: absolute;
          display: block;
          width: 0;
          height: 0;
          border-radius: 50%;
          background-color: rgba(16, 185, 129, 0.4);
          transform: translate(-50%, -50%);
          transition: width 0.7s, height 0.7s;
        }
        
        .matrix-button:hover .button-glow {
          width: 200px;
          height: 200px;
        }
      `}</style>
    </div>
  );
}