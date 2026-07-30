"use client";
import React from "react";
import { cn } from "@/lib/utils";
import GlobeDemo from "@/components/globe-demo";
import { services as staticServices } from "@/data/services";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { motion } from "framer-motion";
import { IconDeviceDesktopAnalytics } from "@tabler/icons-react";
import { Loader2 } from "lucide-react";
import * as LucideIcons from "lucide-react";

export default function FeaturesSectionDemo({ limit }: { limit?: number }) {
  const [dbServices, setDbServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const q = query(collection(db, "services"), orderBy("createdAt", "asc"));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        if (data.length > 0) {
          setDbServices(data);
        } else {
          setDbServices(staticServices);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
        setDbServices(staticServices);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  if (loading) {
    return (
      <section id="services" className="relative z-20 mx-auto max-w-7xl py-24 bg-transparent min-h-[400px] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </section>
    );
  }

  let allServices = dbServices.length > 0 ? dbServices : staticServices;
  const displayServices = limit ? allServices.slice(0, limit) : allServices;

  const features = displayServices.map((service, index) => {
    const defaultSkeletons = [<SkeletonOne />, <SkeletonTwo />, <SkeletonThree />, <SkeletonFour />];
    let skeleton = defaultSkeletons[index % defaultSkeletons.length];
    
    if (service.visualType === 'globe') {
      skeleton = <SkeletonFour />;
    } else if (service.visualType === 'image' && service.thumbnailUrl) {
      skeleton = <SkeletonOne imageUrl={service.thumbnailUrl} />;
    } else if (service.visualType === 'ui_mockup' || service.visualType === 'staggered_images') {
      skeleton = <SkeletonUIUX />;
    } else if (service.visualType === 'analytics') {
      skeleton = <SkeletonThree />;
    }

    const classes = [
      "col-span-1 lg:col-span-4 border-b lg:border-r dark:border-neutral-800 group/feature cursor-pointer",
      "border-b col-span-1 lg:col-span-2 dark:border-neutral-800 group/feature cursor-pointer",
      "col-span-1 lg:col-span-3 lg:border-r dark:border-neutral-800 group/feature cursor-pointer",
      "col-span-1 lg:col-span-3 border-b lg:border-none group/feature cursor-pointer",
    ];
    return {
      ...service,
      skeleton,
      className: classes[index % classes.length],
    };
  });
  return (
    <section id="services" className="relative z-20 mx-auto max-w-7xl py-24 bg-transparent">
      <div className="px-8">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-sm font-bold text-primary tracking-widest uppercase mb-3 text-center"
        >
          Our Services
        </motion.h2>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto max-w-5xl text-center text-3xl font-bold tracking-tight text-black dark:text-white lg:text-5xl lg:leading-tight"
        >
          Comprehensive Web & App Solutions
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto my-4 max-w-2xl text-center text-sm font-normal text-neutral-500 lg:text-base"
        >
          From full-stack web applications to cross-platform mobile apps, Adat Soft Solutions has everything you need to scale your digital presence.
        </motion.p>
      </div>

      <div className="relative">
        <div className="mt-12 grid grid-cols-1 rounded-md lg:grid-cols-6 xl:border border-neutral-200">
          {features.map((feature, idx) => (
            <FeatureCard key={feature.title} className={feature.className} delay={idx * 0.1} cursorText={feature.title}>
              <Link to={`/services/${feature.slug}`} className="absolute inset-0 z-50" aria-label={`View ${feature.title} details`}></Link>
              <FeatureTitle iconName={feature.iconName}>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
              <div className="h-full w-full">{feature.skeleton}</div>
              <div className="absolute top-8 right-8 opacity-0 group-hover/feature:opacity-100 transition-opacity z-40">
                <span className="bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full font-medium">Read More</span>
              </div>
            </FeatureCard>
          ))}
        </div>
      </div>
    </section>
  );
}

const FeatureCard = ({
  children,
  className,
  delay = 0,
  cursorText
}: {
  children?: React.ReactNode;
  className?: string;
  delay?: number;
  cursorText?: string;
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      className={cn(`relative overflow-hidden p-4 sm:p-8`, className)}
      data-cursor-text={cursorText}
    >
      {children}
    </motion.div>
  );
};

const FeatureTitle = ({ children, iconName }: { children?: React.ReactNode, iconName?: string }) => {
  const IconComponent = iconName ? (LucideIcons as any)[iconName] : null;
  return (
    <p className="mx-auto max-w-5xl text-left text-xl font-bold tracking-tight text-black md:text-2xl md:leading-snug flex items-center gap-3">
      {IconComponent && <IconComponent className="w-7 h-7 text-primary" />}
      {children}
    </p>
  );
};

const FeatureDescription = ({ children }: { children?: React.ReactNode }) => {
  return (
    <p
      className={cn(
        "mx-auto max-w-4xl text-left text-sm md:text-base",
        "text-center font-normal text-neutral-500",
        "mx-0 my-2 max-w-sm text-left md:text-sm",
      )}
    >
      {children}
    </p>
  );
};

export const SkeletonOne = ({ imageUrl }: { imageUrl?: string }) => {
  const src = imageUrl || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop";
  return (
    <div className="relative flex h-full gap-10 px-2 py-8">
      <div className="group mx-auto h-full w-full bg-white p-5 shadow-2xl border border-neutral-200 rounded-xl overflow-hidden">
        <div className="flex h-full w-full flex-1 flex-col space-y-2">
          <img
            src={src}
            alt="header"
            width={800}
            height={800}
            className="aspect-video h-full w-full rounded-sm object-cover object-left-top"
          />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 h-60 w-full bg-gradient-to-t from-white via-white to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-40 h-60 w-full bg-gradient-to-b from-white via-transparent to-transparent" />
    </div>
  );
};

export const SkeletonThree = () => {
  return (
    <a
      href="#"
      className="group/image relative flex h-full gap-10"
    >
      <div className="group mx-auto h-full w-full bg-transparent">
        <div className="relative flex h-full w-full flex-1 flex-col space-y-2">
          <IconDeviceDesktopAnalytics className="absolute inset-0 z-10 m-auto h-20 w-20 text-primary drop-shadow-xl" />
          <img
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop"
            alt="header"
            width={800}
            height={800}
            className="aspect-square h-full w-full rounded-xl object-cover object-center blur-none transition-all duration-200 group-hover/image:blur-md border border-neutral-200"
          />
        </div>
      </div>
    </a>
  );
};

export const SkeletonUIUX = () => {
  const variants = {
    initial: { y: 0 },
    animate: { y: -8, transition: { duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" } as any },
  };
  
  return (
    <div className="relative flex h-full w-full items-center justify-center bg-transparent p-4 lg:p-8 min-h-[300px]">
      
      {/* Floating Cards to represent UI/UX */}
      <div className="relative w-full max-w-[280px] aspect-[4/3] mx-auto">
        
        {/* Card 1: Wireframe / Chart */}
        <motion.div 
          initial={{ opacity: 0, x: -30, y: 20 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute left-0 bottom-4 w-[75%] rounded-2xl border border-neutral-100 bg-white p-4 shadow-[0_8px_30px_rgb(0,0,0,0.08)] z-10"
        >
          <div className="h-2 w-1/3 rounded-full bg-neutral-200 mb-4"></div>
          <div className="h-20 w-full rounded-xl bg-neutral-50/50 border border-neutral-100 flex items-end gap-2 px-3 pb-3">
            <div className="w-1/4 h-[40%] rounded-t-sm bg-sky-200"></div>
            <div className="w-1/4 h-[70%] rounded-t-sm bg-sky-400"></div>
            <div className="w-1/4 h-[100%] rounded-t-sm bg-blue-600"></div>
            <div className="w-1/4 h-[60%] rounded-t-sm bg-sky-300"></div>
          </div>
        </motion.div>

        {/* Card 2: Main Interface */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: -20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="absolute right-0 top-0 w-[80%] rounded-2xl border border-neutral-200/80 bg-white/90 backdrop-blur-xl p-5 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] z-20"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-inner">
              <div className="h-4 w-4 rounded-full bg-white/20"></div>
            </div>
            <div className="space-y-2">
              <div className="h-2.5 w-24 rounded-full bg-neutral-800"></div>
              <div className="h-1.5 w-12 rounded-full bg-neutral-400"></div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="h-10 w-full rounded-xl bg-neutral-50 border border-neutral-100 flex items-center px-4">
              <div className="h-1.5 w-1/2 rounded-full bg-neutral-300"></div>
            </div>
            <div className="h-10 w-full rounded-xl bg-neutral-50 border border-neutral-100 flex items-center px-4">
              <div className="h-1.5 w-2/3 rounded-full bg-neutral-300"></div>
            </div>
          </div>
        </motion.div>
        
        {/* Card 3: Floating Element / Notification */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={variants}
          className="absolute -right-6 bottom-12 flex items-center gap-3 rounded-2xl border border-neutral-100 bg-white px-5 py-3 shadow-[0_10px_30px_rgb(0,0,0,0.1)] z-30"
        >
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </div>
          <div className="h-2 w-20 rounded-full bg-neutral-700"></div>
        </motion.div>

        {/* Floating cursor */}
        <motion.div
          initial={{ opacity: 0, x: 20, y: 50 }}
          whileInView={{ opacity: 1, x: -10, y: -20 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="absolute right-10 bottom-0 z-40"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-lg text-black">
            <path d="M4 2L20 10.6667L11.5556 12.4444L9.77778 20.8889L4 2Z" fill="currentColor" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
      </div>
    </div>
  )
}

export const SkeletonTwo = () => {
  const images = [
    "https://images.unsplash.com/photo-1517322048670-4fba75cbbb62?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1573790387438-4da905039392?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1554931670-4ebfabf6e7a9?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1546484475-7f7bd55792da?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3",
  ];

  const imageVariants = {
    whileHover: {
      scale: 1.1,
      rotate: 0,
      zIndex: 100,
    },
    whileTap: {
      scale: 1.1,
      rotate: 0,
      zIndex: 100,
    },
  };
  return (
    <div className="relative flex h-full flex-col items-start gap-10 overflow-hidden p-8">
      <div className="-ml-20 flex flex-row">
        {images.map((image, idx) => (
          <motion.div
            variants={imageVariants}
            key={"images-first" + idx}
            style={{
              rotate: Math.random() * 20 - 10,
            }}
            whileHover="whileHover"
            whileTap="whileTap"
            className="mt-4 -mr-4 shrink-0 overflow-hidden rounded-xl border border-neutral-100 bg-white p-1"
          >
            <img
              src={image}
              alt="bali images"
              width="500"
              height="500"
              className="h-20 w-20 shrink-0 rounded-lg object-cover md:h-40 md:w-40"
            />
          </motion.div>
        ))}
      </div>
      <div className="flex flex-row">
        {images.map((image, idx) => (
          <motion.div
            key={"images-second" + idx}
            style={{
              rotate: Math.random() * 20 - 10,
            }}
            variants={imageVariants}
            whileHover="whileHover"
            whileTap="whileTap"
            className="mt-4 -mr-4 shrink-0 overflow-hidden rounded-xl border border-neutral-100 bg-white p-1"
          >
            <img
              src={image}
              alt="bali images"
              width="500"
              height="500"
              className="h-20 w-20 shrink-0 rounded-lg object-cover md:h-40 md:w-40"
            />
          </motion.div>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 z-[100] h-full w-20 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-[100] h-full w-20 bg-gradient-to-l from-white to-transparent" />
    </div>
  );
};

export const SkeletonFour = () => {
  return (
    <div className="relative mt-4 flex h-[350px] md:h-[450px] flex-col items-center bg-transparent w-full">
      <GlobeDemo />
    </div>
  );
};


