import React, { useState, useEffect, MouseEvent as ReactMouseEvent, useCallback } from 'react';

// --- Icon Components ---
// Using inline SVGs to avoid import issues
const IconUser = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M10 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-7 9a7 7 0 1 1 14 0H3z" clipRule="evenodd" />
  </svg>
);

const IconBriefcase = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M2 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5zm14 0H4v2h12V5zM2 11a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6zm14 0H4v6h12v-6z" clipRule="evenodd" />
  </svg>
);

const IconMail = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
    <path d="M2.003 5.884L10 11.884l7.997-6L10 3 2.003 5.884zM18 7.116l-8 5-8-5V15a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.116z" />
  </svg>
);

const IconHeart = ({ className, isLiked, onClick }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} onClick={onClick}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

// Added for the new hero
const IconCircle = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="none" className={className}>
    <circle cx="12" cy="12" r="10" />
  </svg>
);

// --- NEW ICONS FOR THEME TOGGLE ---
const IconSun = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="4"></circle>
    <path d="M12 2v2"></path>
    <path d="M12 20v2"></path>
    <path d="m4.93 4.93 1.41 1.41"></path>
    <path d="m17.66 17.66 1.41 1.41"></path>
    <path d="M2 12h2"></path>
    <path d="M20 12h2"></path>
    <path d="m6.34 17.66-1.41 1.41"></path>
    <path d="m19.07 4.93-1.41 1.41"></path>
  </svg>
);

const IconMoon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
  </svg>
);

// --- Icons for Footer ---
const IconGitHub = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386C24 5.373 18.627 0 12 0z" />
  </svg>
);

const IconLinkedIn = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const IconTwitter = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-.424.728-.666 1.58-.666 2.474 0 1.71.87 3.213 2.188 4.099-.808-.026-1.568-.248-2.228-.616v.054c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.628 1.956 2.444 3.379 4.6 3.419-1.68 1.319-3.807 2.105-6.102 2.105-.398 0-.79-.023-1.175-.068 2.189 1.403 4.791 2.223 7.548 2.223 9.054 0 13.999-7.496 13.999-13.986 0-.213-.005-.426-.015-.637.961-.695 1.79-1.56 2.455-2.55z" />
  </svg>
);

// --- NEW SPARKLE ICON ---
const IconSparkle = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M10 3.168c.096-.34.363-.61.706-.705.343-.095.688.01.92.242l1.104 1.104c.14.14.332.22.53.22h1.56c.414 0 .75.336.75.75 0 .198-.08.39-.22.53l-1.104 1.104c-.232.232-.337.577-.242.92.095.343.365.61.705.706.34.096.61.363.705.706.095.343-.01.688-.242.92l-1.104 1.104c-.14.14-.22.332-.22.53v1.56c0 .414-.336.75-.75.75-.198 0-.39-.08-.53-.22l-1.104-1.104c-.232-.232-.577-.337-.92-.242-.343.095-.61.365-.706.705-.096.34-.363.61-.706.705-.343.095-.688-.01-.92-.242l-1.104-1.104c-.14-.14-.332-.22-.53-.22h-1.56c-.414 0-.75-.336-.75-.75 0 .198.08.39.22-.53l1.104-1.104c.232-.232.337-.577.242-.92-.095-.343-.365-.61-.705-.706-.34-.096-.61-.363-.705-.706-.095-.343.01-.688.242-.92l1.104-1.104c.14-.14.22-.332.22-.53v-1.56c0-.414.336-.75.75-.75.198 0 .39.08.53.22l1.104 1.104c.232.232.577.337.92.242.343-.095.61-.365.706-.705zM5.5 14.5c.276 0 .5.224.5.5s-.224.5-.5.5-.5-.224-.5-.5.224-.5.5-.5zm9-5c.276 0 .5.224.5.5s-.224.5-.5.5-.5-.224-.5-.5.224-.5.5-.5z" clipRule="evenodd" />
  </svg>
);


// --- User's Provided Components (Slightly Modified) ---

function Avatar({ src, alt }) {
  return (
    <img
      src={src}
      alt={alt}
      className="shrink-0 w-10 h-10 rounded-full aspect-square"
      onError={(e) => { e.target.src = 'https://placehold.co/40x40/334155/E2E8F0?text=A' }} // Fallback
    />
  );
}

function AuthorInfo({ name, comment, likes, onLikeToggle }) {
  const [showCommentSection, setShowCommentSection] = useState(false);
  const [reply, setReply] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [isPosting, setIsPosting] = useState(false); // State to track if posting

  const handleLikeToggle = () => {
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    onLikeToggle(newLikedState ? likes + 1 : likes - 1);
  };

  const handlePostReply = async () => {
    if (reply.trim() !== "") {
      // Simulate sending the reply to the backend
      setIsPosting(true); // Set isPosting to true when posting
      setTimeout(() => {
        setReply(""); // Clear the reply field after posting
        setShowCommentSection(false); // Close the reply box after posting
        setIsPosting(false); // Set isPosting back to false after posting
      }, 2000); // Simulated delay
    }
  };

  return (
    <div className="flex flex-col self-stretch flex-grow">
      <div className="flex justify-between items-center">
        <div className="text-base font-semibold tracking-tight leading-6 text-gray-900 dark:text-gray-100">
          {name}
        </div>
        <IconHeart
          isLiked={isLiked}
          onClick={handleLikeToggle}
          className={`w-5 h-5 cursor-pointer text-gray-500 ${
            isLiked ? 'text-red-500' : 'dark:hover:text-gray-300 hover:text-gray-700'
          }`}
        />
      </div>
      <div className="mt-3 leading-6 text-gray-700 dark:text-gray-300">{comment}</div>
      <div className="flex gap-4 items-center mt-3 leading-[157%] text-sm">
        <button
          onClick={() => setShowCommentSection(!showCommentSection)}
          className="font-semibold text-gray-600 dark:text-gray-300 dark:hover:text-white hover:text-gray-900"
        >
          Reply
        </button>
        <span className="text-gray-500">{likes} likes</span>
      </div>
      {showCommentSection && (
        <div className="mt-4 p-3 rounded-lg bg-gray-100 dark:bg-gray-800">
          <textarea
            className="w-full h-20 resize-none rounded-md p-2 bg-white text-gray-900 border border-gray-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500"
            placeholder="Write a reply..."
            value={reply}
            onChange={(e) => setReply(e.target.value)}
          ></textarea>
          <button
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-500"
            onClick={handlePostReply}
            disabled={isPosting} // Disable button when posting
          >
            {isPosting ? 'Posting...' : 'Post Reply'}
          </button>
        </div>
      )}
    </div>
  );
}

// Guestbook Section
function GuestbookSection() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Simulate fetching comments from the backend
    const simulatedComments = [
      {
        id: 1,
        avatarSrc:
          "https://placehold.co/40x40/4ADE80/FFFFFF?text=FA",
        avatarAlt: "Fatima A's profile picture",
        name: "Fatima A. (Client)",
        comment:
          "Abdel-rahman was incredible. He took our vague ideas and built a high-performing Meta ad campaign that doubled our leads in a month. His understanding of performance marketing is top-notch.",
        likes: 214,
      },
      {
        id: 2,
        avatarSrc:
          "https://placehold.co/40x40/2DD4BF/FFFFFF?text=MK",
        avatarAlt: "Mohammed K's profile picture",
        name: "Mohammed K. (Colleague)",
        comment:
          "I worked with Abdel-rahman on a complex Google Ads project. His analytical skills and strategic approach to budget planning are impressive. He's a data-driven marketer who always delivers results.",
        likes: 92,
      },
    ];
    setComments(simulatedComments);
  }, []);

  const handleLikeToggle = (commentId, newLikes) => {
    setComments((prevComments) =>
      prevComments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            likes: newLikes,
          };
        }
        return comment;
      }),
    );
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {comments.map((comment) => (
        <article
          key={comment.id}
          className="flex gap-4 items-start p-4 text-sm tracking-tight rounded-2xl bg-white/50 border border-gray-200/50 shadow-lg dark:bg-gray-800/50 backdrop-blur-sm dark:border-gray-700/50"
        >
          <Avatar src={comment.avatarSrc} alt={comment.avatarAlt} />
          <AuthorInfo
            name={comment.name}
            comment={comment.comment}
            likes={comment.likes}
            onLikeToggle={(newLikes) => handleLikeToggle(comment.id, newLikes)}
          />
        </article>
      ))}
    </div>
  );
}

// --- NEW THEME TOGGLE COMPONENTS ---

// Helper hook for using with View Transitions API
const useThemeTransition = () => {
  const startTransition = useCallback((updateFn) => {
    if ('startViewTransition' in document) {
      // Type assertion to call the experimental API
      (document).startViewTransition(updateFn);
    } else {
      updateFn();
    }
  }, []);

  return { startTransition };
};

// Adapted ThemeToggleButton
const ThemeToggleButton = ({
  theme = 'light',
  variant = 'circle',
  start = 'center',
  className,
  onClick,
}) => {
  
  const handleClick = useCallback(() => {
    // Inject animation styles for this specific transition
    const styleId = `theme-transition-${Date.now()}`;
    const style = document.createElement('style');
    style.id = styleId;
    
    let css = '';
    const positions = {
      center: 'center',
      'top-left': 'top left',
      'top-right': 'top right',
      'bottom-left': 'bottom left',
      'bottom-right': 'bottom right',
    };
    
    if (variant === 'circle') {
      const cx = start === 'center' ? '50' : start.includes('left') ? '0' : '100';
      const cy = start === 'center' ? '50' : start.includes('top') ? '0' : '100';
      css = `
        @supports (view-transition-name: root) {
          ::view-transition-old(root) { 
            animation: none;
          }
          ::view-transition-new(root) {
            animation: circle-expand 0.4s ease-out;
            transform-origin: ${positions[start]};
          }
          @keyframes circle-expand {
            from {
              clip-path: circle(0% at ${cx}% ${cy}%);
            }
            to {
              clip-path: circle(150% at ${cx}% ${cy}%);
            }
          }
        }
      `;
    }
    // Add other variants here if needed
    
    if (css) {
      style.textContent = css;
      document.head.appendChild(style);
      
      // Clean up animation styles after transition
      setTimeout(() => {
        const styleEl = document.getElementById(styleId);
        if (styleEl) {
          styleEl.remove();
        }
      }, 3000);
    }
    
    onClick?.();
  }, [onClick, variant, start, theme]);

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`relative overflow-hidden transition-all inline-flex items-center justify-center h-10 w-10 rounded-full text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-700 ${className || ''}`}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      {theme === 'light' ? (
        <IconSun className="h-[1.2rem] w-[1.2rem]" />
      ) : (
        <IconMoon className="h-[1.2rem] w-[1.2rem]" />
      )}
    </button>
  );
};


// --- New Personal Website Components ---

// Header / Navbar
function Navbar({ theme, onToggleTheme }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navItems = [
    { name: 'About', href: '#about', icon: IconUser },
    { name: 'Projects', href: '#projects', icon: IconBriefcase },
    { name: 'Guestbook', href: '#guestbook', icon: IconUser },
    { name: 'Contact', href: '#contact', icon: IconMail },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-b border-gray-200/80 dark:border-gray-700/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <a href="#" className="text-2xl font-bold text-gray-900 dark:text-white">
            <span className="text-blue-600 dark:text-blue-400">Abdel-rahman</span>AwaD
          </a>
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center md:space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
              >
                <item.icon className="w-4 h-4 mr-2" />
                {item.name}
              </a>
            ))}
            <ThemeToggleButton theme={theme} onClick={onToggleTheme} />
          </nav>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggleButton theme={theme} onClick={onToggleTheme} />
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              aria-label="Toggle mobile menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu Dropdown */}
      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <nav className="px-2 pt-2 pb-4 space-y-1 sm:px-3 border-t border-gray-200/80 dark:border-gray-700/80">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)} // Close menu on click
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.name}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

// --- REPLACED HERO SECTION ---
function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-white/[0.08]",
}) {
  const outerStyle = {
    animationDelay: `${delay}s`,
    width,
    height,
    transform: `rotate(${rotate}deg)`,
  };

  const innerStyle = {
    width,
    height,
  };

  const gradientClasses = `bg-gradient-to-r to-transparent ${gradient}`;
  
  return (
    <div
      style={outerStyle}
      className={`absolute animate-fade-in ${className || ''}`}
    >
      <div
        style={innerStyle}
        className="relative animate-bob"
      >
        <div
          className={`
            absolute inset-0 rounded-full
            ${gradientClasses}
            backdrop-blur-[2px] border-black/[0.10] dark:border-white/[0.15]
            shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]
            after:absolute after:inset-0 after:rounded-full
            after:bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.05),transparent_70%)] dark:after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]
          `}
        />
      </div>
    </div>
  );
}

// New Hero component based on shadcn.io, now with photo
function HeroGeometric({
  title1 = "Elevate Your Digital Vision",
  title2 = "Crafting Exceptional Websites",
  description = "Crafting exceptional digital experiences through innovative design and cutting-edge technology.",
  photoUrl,
  className,
}) {
  return (
    <div
      id="home"
      className={`relative min-h-screen w-full flex items-center justify-center overflow-hidden dark:bg-[#030303] bg-white ${className || ''} py-16 md:py-0`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.10] via-transparent to-blue-500/[0.10] dark:from-indigo-500/[0.05] dark:via-transparent dark:to-blue-500/[0.05] blur-3xl" />
      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape
          delay={0.3}
          width={600}
          height={140}
          rotate={12}
          gradient="from-indigo-500/[0.15]"
          className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
        />
        <ElegantShape
          delay={0.5}
          width={500}
          height={120}
          rotate={-15}
          gradient="from-sky-500/[0.15]"
          className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
        />
        <ElegantShape
          delay={0.4}
          width={300}
          height={80}
          rotate={-8}
          gradient="from-indigo-500/[0.15]"
          className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
        />
        <ElegantShape
          delay={0.6}
          width={200}
          height={60}
          rotate={20}
          gradient="from-blue-400/[0.15]"
          className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
        />
        <ElegantShape
          delay={0.7}
          width={150}
          height={40}
          rotate={-25}
          gradient="from-sky-400/[0.15]"
          className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
        />
      </div>
      <div className="relative z-10 container mx-auto px-4 md:px-6">
        {/*
          Layout fix:
          - Swapped order of Text and Image sections in the code.
          - On mobile (default), Text will now appear first and be left-aligned.
          - On desktop (md:), we use order classes to keep Text on the left (md:order-1) and Image on the right (md:order-2).
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
          
          {/* Text Section (Now first in code and left-aligned) */}
          <div className="md:order-1 max-w-3xl mx-auto text-left">
            
            <div
              className="animate-fade-up"
              style={{ animationDelay: '0.7s' }}
            >
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-4 md:mb-6 tracking-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-b from-gray-900 to-gray-900/80 dark:from-white dark:to-white/80">
                  {title1}
                </span>
                <br />
                {/* FIX: Reduced font size to text-2xl/4xl/5xl and changed line-height to 'leading-relaxed'
                  This will fix the clipping issue.
                */}
                <span
                  className={
                    "block text-2xl sm:text-4xl md:text-5xl font-medium leading-relaxed bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-gray-900/90 to-sky-600 dark:from-indigo-300 dark:via-white/90 dark:to-sky-300"
                  }
                >
                  {title2}
                </span>
              </h1>
            </div>
            {/*
              FIX: Added padding-bottom (pb-8) to this div to prevent
              the button from being "cropped" or too close to the edge.
            */}
            <div
              className="animate-fade-up pb-8"
              style={{ animationDelay: '0.9s' }}
            >
              <p className="text-base sm:text-lg md:text-xl text-gray-900/60 dark:text-white/40 mb-8 leading-relaxed font-light tracking-wide max-w-xl mx-auto md:mx-0">
                {description}
              </p>
              <a
                href="#contact"
                className="px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-300 transition-colors"
              >
                Get In Touch
              </a>
            </div>
          </div>
          
          {/* Image Section (Now second in code) */}
          <div className="md:order-2 flex justify-center animate-fade-up" style={{ animationDelay: '0.5s' }}>
            <img 
              src={photoUrl} 
              alt="Abdel-rahman Awad" 
              className="w-64 h-64 sm:w-80 sm:h-80 rounded-full object-cover border-4 border-gray-200/50 dark:border-gray-700/50 shadow-2xl"
              onError={(e) => { e.target.src = 'https://placehold.co/300x300/3B82F6/FFFFFF?text=AA' }} // Fallback
            />
          </div>

        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white/80 dark:from-[#030303] dark:via-transparent dark:to-[#030303]/80 pointer-events-none" />
    </div>
  );
}

// --- END REPLACED HERO SECTION ---

// Section Wrapper
function Section({ id, title, children }) {
  return (
    <section id={id} className="py-20 md:py-28 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}

// --- NEW RADAR CHART COMPONENT ---
function RadarChart({ skills, theme }) {
  const size = 300;
  const center = size / 2;
  const levels = 5;
  const radius = center * 0.8;
  const angleSlice = (Math.PI * 2) / skills.length;

  // Colors
  const gridColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)';
  const labelColor = theme === 'dark' ? '#E5E7EB' : '#1F2937';
  const shapeFill = theme === 'dark' ? 'rgba(59, 130, 246, 0.5)' : 'rgba(59, 130, 246, 0.7)';
  const shapeStroke = theme === 'dark' ? '#3B82F6' : '#2563EB';

  // Calculate points for the skill shape
  const skillPoints = skills.map((skill, i) => {
    const r = (radius * skill.level) / levels;
    const x = center + r * Math.cos(angleSlice * i - Math.PI / 2);
    const y = center + r * Math.sin(angleSlice * i - Math.PI / 2);
    return `${x},${y}`;
  }).join(' ');

  const gridPolygons = [...Array(levels)].map((_, i) => {
    const r = (radius / levels) * (i + 1);
    const points = skills.map((_, j) => {
      const x = center + r * Math.cos(angleSlice * j - Math.PI / 2);
      const y = center + r * Math.sin(angleSlice * j - Math.PI / 2);
      return `${x},${y}`;
    }).join(' ');
    return <polygon key={`grid-${i}`} points={points} fill="none" stroke={gridColor} strokeWidth="1" />;
  });

  const axes = skills.map((_, i) => {
    const x = center + radius * Math.cos(angleSlice * i - Math.PI / 2);
    const y = center + radius * Math.sin(angleSlice * i - Math.PI / 2);
    return <line key={`axis-${i}`} x1={center} y1={center} x2={x} y2={y} stroke={gridColor} strokeWidth="1" />;
  });

  const labels = skills.map((skill, i) => {
    const r = radius * 1.15; // Position labels outside the grid
    const x = center + r * Math.cos(angleSlice * i - Math.PI / 2);
    const y = center + r * Math.sin(angleSlice * i - Math.PI / 2);
    
    let textAnchor = "middle";
    if (x < center - 10) textAnchor = "end";
    if (x > center + 10) textAnchor = "start";
    
    return (
      <text
        key={`label-${i}`}
        x={x}
        y={y + 5} // Small offset for better alignment
        fill={labelColor}
        fontSize="12"
        fontWeight="500"
        textAnchor={textAnchor}
      >
        {skill.label}
      </text>
    );
  });

  const skillCircles = skills.map((skill, i) => {
    const r = (radius * skill.level) / levels;
    const x = center + r * Math.cos(angleSlice * i - Math.PI / 2);
    const y = center + r * Math.sin(angleSlice * i - Math.PI / 2);
    return <circle key={`point-${i}`} cx={x} cy={y} r="3" fill={shapeStroke} />;
  });

  return (
    <svg viewBox={`0 0 ${size} ${size}`} width="100%" height="100%">
      <g>
        {gridPolygons}
        {axes}
        {labels}
        <polygon points={skillPoints} fill={shapeFill} stroke={shapeStroke} strokeWidth="2" />
        {skillCircles}
      </g>
    </svg>
  );
}
// --- END RADAR CHART COMPONENT ---

// About Section
function About({ theme }) {
  // Define skills for the radar chart (level out of 5)
  const skills = [
    { label: 'Media Buying', level: 5 },
    { label: 'Strategy', level: 5 },
    { label: 'Analytics', level: 4 },
    { label: 'Leadership', level: 4 },
    { label: 'Google Ads', level: 4 },
    { label: 'Meta Ads', level: 5 },
  ];

  return (
    <Section id="about" title="About Me">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Text Description */}
        <div className="text-lg text-center md:text-left text-gray-700 dark:text-gray-300 space-y-6">
          <p>
            Marketing Manager with over 5 years of experience in digital marketing,
            media buying, and campaign strategy. Skilled in executing and optimizing
            ads across major platforms including Meta, TikTok, Snapchat, and Google Ads.
          </p>
          <p>
            Strong ability to drive ROI-focused marketing strategies, lead performance
            teams, and scale brands across digital channels. Excellent analytical,
            leadership, and communication skills.
          </p>
        </div>
        
        {/* Radar Chart */}
        <div className="pt-4">
          <h3 className="text-xl font-semibold text-center text-gray-900 dark:text-white mb-4">My Core Competencies</h3>
          <div className="max-w-sm mx-auto h-64 md:h-80">
            <RadarChart skills={skills} theme={theme} />
          </div>
        </div>
      </div>
    </Section>
  );
}

// --- NEW SPOTLIGHT PROJECT CARD ---
function SpotlightCard({ byline, title, description }) {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  function handleMouseMove(event) {
    // Correct for TypeScript syntax in JSX
    const { currentTarget, clientX, clientY } = event;
    const { left, top } = currentTarget.getBoundingClientRect();
    setMouseX(clientX - left);
    setMouseY(clientY - top);
  }

  // Create the motion-like template string
  const background = `radial-gradient(650px circle at ${mouseX}px ${mouseY}px, rgba(14, 165, 233, 0.15), transparent 80%)`;

  return (
    <div
      className="group relative h-full rounded-xl border border-black/10 bg-gray-50 dark:border-white/10 dark:bg-gray-900 px-8 py-16 shadow-2xl"
      onMouseMove={handleMouseMove}
    >
      <div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{ background }}
      />
      <div>
        <h3 className="text-base font-semibold leading-7 text-sky-600 dark:text-sky-500">
          {byline}
        </h3>
        <div className="mt-2 flex items-center gap-x-2">
          <span className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </span>
        </div>
        <p className="mt-6 text-base leading-7 text-gray-700 dark:text-gray-300">
          {description}
        </p>
      </div>
    </div>
  );
}

// Projects Section
function Projects() {
  const projectData = [
    {
      byline: "E-Commerce",
      title: "6x ROAS Campaign",
      description: "Achieved up to 6x ROAS for e-commerce and local brands by managing full ad funnels: awareness, retargeting, and conversion.",
    },
    {
      byline: "Media Buying",
      title: "Multi-Platform Ads",
      description: "Planned and executed multi-platform ad campaigns with monthly budgets exceeding $10,000 across Meta, TikTok, and Google.",
    },
    {
      byline: "Strategy",
      title: "Startup Growth",
      description: "Supported the growth of various startup brands using Meta and Google Ads, building custom creatives and marketing strategies.",
    },
  ];

  return (
    <Section id="projects" title="My Projects">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {projectData.map((project) => (
          <SpotlightCard
            key={project.title}
            byline={project.byline}
            title={project.title}
            description={project.description}
          />
        ))}
      </div>
    </Section>
  );
}

// Contact Section
function Contact() {
  const [aiPrompt, setAiPrompt] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const callGeminiApi = async (prompt) => {
    // --- System instruction for the AI ---
    // This guides the AI to generate a good response.
    const systemPrompt = `You are a professional communication assistant. The user, Abdel-rahman Awad, is a Digital Marketing Manager. A potential client is visiting his website and wants to send him a message.
    
    Based on the user's keywords, write a polite, professional, and concise message to Abdel-rahman.
    - Start with a polite greeting (e.g., "Hi Abdel-rahman,").
    - Clearly state the purpose of the message based on the user's keywords.
    - Keep it concise (2-4 sentences).
    - End with a polite closing (e.g., "Best regards," or "Looking forward to hearing from you,").
    - Do NOT add a placeholder for the user's name (e.g., "[Your Name]"). The form has a separate name field.`;
    
    // --- User's query to the AI ---
    const userQuery = `Keywords for my message: "${prompt}"`;

    // --- API Call ---
    const apiKey = ""; // API key is handled by the environment
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

    const payload = {
      contents: [{ parts: [{ text: userQuery }] }],
      systemInstruction: {
        parts: [{ text: systemPrompt }]
      },
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const result = await response.json();
      const candidate = result.candidates?.[0];

      if (candidate && candidate.content?.parts?.[0]?.text) {
        return candidate.content.parts[0].text;
      } else {
        throw new Error("Invalid response from AI. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
      return null;
    }
  };

  const handleGenerateDraft = async () => {
    if (!aiPrompt.trim()) {
      setError("Please enter some keywords for the AI assistant.");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setMessage(""); // Clear previous message

    // Implement retry logic
    let draft = null;
    for (let i = 0; i < 3; i++) { // Retry up to 3 times
      try {
        draft = await callGeminiApi(aiPrompt);
        if (draft) break;
      } catch (err) {
        if (i === 2) {
           setError("The AI assistant failed. Please try again or write your message manually.");
        }
        await new Promise(res => setTimeout(res, (i + 1) * 1000)); // Exponential backoff
      }
    }

    if (draft) {
      setMessage(draft);
    } else if (!error) {
      setError("The AI assistant couldn't generate a draft. Please try again or write your message manually.");
    }
    
    setIsLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted!");
    
    // Create a custom modal
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50';
    modal.innerHTML = `
      <div class="bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <p class="text-lg font-semibold mb-4">Message Sent!</p>
        <p class="text-sm mb-4">Thank you for reaching out. (This is a demo)</p>
        <button id="close-modal-btn" class="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Close</button>
      </div>
    `;
    document.body.appendChild(modal);
    
    modal.querySelector('#close-modal-btn').addEventListener('click', () => {
      modal.remove();
    });

    // Reset form
    setAiPrompt("");
    setMessage("");
    setError(null);
    e.target.reset();
  };


  return (
    <Section id="contact" title="Get In Touch">
      <div className="max-w-xl mx-auto">
        <p className="text-center text-lg text-gray-700 dark:text-gray-300 mb-8">
          Have a question or want to work together? Feel free to reach out!
        </p>
        
        {/* --- AI ASSISTANT --- */}
        <div className="mb-6 p-4 rounded-md bg-gray-50 border border-gray-200 dark:bg-gray-800/50 dark:border-gray-700/50">
          <label htmlFor="ai-prompt" className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <IconSparkle className="w-4 h-4 mr-2 text-blue-500" />
            AI Message Assistant
          </label>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
            Not sure what to write? Enter a few keywords and let AI draft a message for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              id="ai-prompt"
              name="ai-prompt"
              className="flex-grow w-full px-4 py-3 rounded-md bg-white text-gray-900 border border-gray-300 dark:bg-gray-800 dark:text-white dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500"
              placeholder="e.g., 'Help with Meta ads for my coffee shop'"
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={handleGenerateDraft}
              disabled={isLoading}
              className="flex items-center justify-center px-4 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 dark:hover:bg-blue-500 transition-colors disabled:bg-gray-400 dark:disabled:bg-gray-600"
            >
              <IconSparkle className="w-5 h-5 mr-2" />
              {isLoading ? "Generating..." : "Generate Draft"}
            </button>
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
        
        {/* --- CONTACT FORM --- */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-4 py-3 rounded-md bg-white text-gray-900 border border-gray-300 dark:bg-gray-800 dark:text-white dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500"
              placeholder="Your Name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-3 rounded-md bg-white text-gray-900 border border-gray-300 dark:bg-gray-800 dark:text-white dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              required
              className="w-full px-4 py-3 rounded-md bg-white text-gray-900 border border-gray-300 dark:bg-gray-800 dark:text-white dark:border-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500"
              placeholder="Your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-300 transition-colors"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </Section>
  );
}

// Footer
function Footer() {
  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com', icon: IconGitHub },
    { name: 'LinkedIn', url: 'https://linkedin.com', icon: IconLinkedIn },
    { name: 'Twitter', url: 'https://twitter.com', icon: IconTwitter },
  ];

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200/50 dark:border-gray-700/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="text-gray-500 dark:text-gray-400 text-sm mb-4 sm:mb-0">
            &copy; {new Date().getFullYear()} Abdel-rahman Awad. All rights reserved.
          </div>
          <div className="flex space-x-6">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 dark:text-gray-400 dark:hover:text-white hover:text-gray-900 transition-colors"
              >
                <link.icon className="w-6 h-6" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// --- Main App Component ---

export default function App() {
  const [theme, setTheme] = useState('dark');
  const { startTransition } = useThemeTransition();

  const handleThemeToggle = () => {
    startTransition(() => {
      setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    });
  };

  // Effect to update body class for theme
  useEffect(() => {
    // Set class on the <html> element for Tailwind's dark mode
    document.documentElement.className = theme;
  }, [theme]);

  // Effect to inject global styles
  useEffect(() => {
    // This is a bit of a hack for a single file, but demonstrates the effect
    const styleId = "app-global-styles";
    
    // Check if style already exists to avoid duplicates
    if (document.getElementById(styleId)) {
      return;
    }
    
    const style = document.createElement('style');
    style.id = styleId;
    style.innerHTML = `
      @keyframes fade-in {
        from { opacity: 0; transform: translateY(-20px); }
        to { opacity: 1; transform: translateY(0); }
      }

      @keyframes fade-up {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      @keyframes bob {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(15px); }
      }
      
      .animate-fade-in {
        animation: fade-in 2.4s cubic-bezier(0.23, 0.86, 0.39, 0.96) forwards;
        opacity: 0;
      }
      
      .animate-fade-up {
        animation: fade-up 1s cubic-bezier(0.25, 0.4, 0.25, 1) forwards;
        opacity: 0;
      }

      .animate-bob {
        animation: bob 12s ease-in-out infinite;
      }
      
      /* Smooth scrolling */
      html {
        scroll-behavior: smooth;
      }
    `;
    document.head.appendChild(style);
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div className={`min-h-screen font-sans antialiased transition-colors duration-300 ${theme === 'dark' ? 'dark:bg-[#030303] dark:text-white' : 'bg-white text-gray-900'}`}>
      <Navbar theme={theme} onToggleTheme={handleThemeToggle} />
      <main>
        <HeroGeometric 
          title1="Abdel-rahman Awad"
          title2="Media Buying & Strategy"
          description="5+ years of experience executing and optimizing ad campaigns across Meta, TikTok, Snapchat, and Google Ads."
          photoUrl="{WhatsApp Image 2025-11-04 at 07.11.31.jpeg}"
        />
        <About theme={theme} />
        <Projects />
        <Section id="guestbook" title="Guestbook">
          <GuestbookSection />
        </Section>
        <Contact />
      </main>
      <Footer />
    </div>
  );
}