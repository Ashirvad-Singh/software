import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

const transition = {
  type: "spring" as const,
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({
  setActive,
  active,
  item,
  children,
  align = "item",
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
  align?: "item" | "center-menu";
}) => {
  return (
    <div
      onMouseEnter={() => setActive(item)}
      className={cn(align === "center-menu" ? "static" : "relative")}
    >
      <motion.p
        transition={{ duration: 0.3 }}
        className="flex cursor-pointer items-center gap-1 text-black hover:opacity-[0.9] dark:text-white"
      >
        {item}
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-200 ${active === item ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </motion.p>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && (
            <div className="absolute top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2 pt-4 z-50">
              <motion.div
                transition={transition}
                layoutId="active" // layoutId ensures smooth animation
                className="bg-white dark:bg-black backdrop-blur-sm rounded-2xl overflow-hidden border border-black/[0.2] dark:border-white/[0.2] shadow-xl"
              >
                <motion.div
                  layout // layout ensures smooth animation
                  className="w-max max-w-[calc(100vw-2rem)] h-full p-1.5"
                >
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)} // resets the state
      className="relative rounded-full border border-transparent dark:bg-black dark:border-white/[0.2] bg-white shadow-input flex items-center justify-center space-x-4 px-8 py-3 "
    >
      {children}
    </nav>
  );
};

export const ProductItem = ({
  title,
  description,
  href,
  src,
}: {
  title: string;
  description: string;
  href: string;
  src: string;
}) => {
  const defaultFallback =
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=500&q=80";
  const [imgSrc, setImgSrc] = React.useState<string>(src || defaultFallback);

  React.useEffect(() => {
    setImgSrc(src || defaultFallback);
  }, [src]);

  return (
    <Link
      to={href}
      className="flex space-x-3 group items-center p-1.5 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-900/60 transition-all"
    >
      <img
        src={imgSrc}
        alt={title}
        onError={() => setImgSrc(defaultFallback)}
        className="shrink-0 rounded-lg shadow-md object-cover h-[75px] w-[130px] sm:w-[140px] group-hover:scale-[1.02] transition-transform duration-200 bg-neutral-100 dark:bg-neutral-800"
      />
      <div className="flex flex-col justify-center">
        <h4 className="text-sm sm:text-base font-bold mb-1 text-black dark:text-white group-hover:text-sky-500 transition-colors leading-snug">
          {title}
        </h4>
        <p className="text-neutral-600 text-xs max-w-[12rem] sm:max-w-[14rem] dark:text-neutral-400 leading-relaxed line-clamp-2">
          {description}
        </p>
      </div>
    </Link>
  );
};

export const HoveredLink = ({
  children,
  href,
  className,
  active,
  ...rest
}: any) => {
  return (
    <Link
      to={href}
      {...rest}
      className={cn(
        "px-3.5 py-2 rounded-xl text-sm font-medium transition-all block",
        active
          ? "bg-sky-50 dark:bg-sky-950/60 text-sky-600 font-bold"
          : "text-neutral-700 dark:text-neutral-200 hover:text-sky-600 dark:hover:text-white hover:bg-neutral-100/80 dark:hover:bg-neutral-900/80",
        className,
      )}
    >
      {children}
    </Link>
  );
};
