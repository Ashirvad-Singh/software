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

export default function FeaturesSectionDemo() {
  const [dbServices, setDbServices] = useState<any[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const q = query(collection(db, "services"), orderBy("createdAt", "desc"));
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
      }
    };
    fetchServices();
  }, []);

  const displayServices = dbServices.length > 0 ? dbServices : staticServices;

  const features = displayServices.map((service, index) => {
    const skeletons = [<SkeletonOne />, <SkeletonTwo />, <SkeletonThree />, <SkeletonFour />];
    const classes = [
      "col-span-1 lg:col-span-4 border-b lg:border-r dark:border-neutral-800 group/feature cursor-pointer",
      "border-b col-span-1 lg:col-span-2 dark:border-neutral-800 group/feature cursor-pointer",
      "col-span-1 lg:col-span-3 lg:border-r dark:border-neutral-800 group/feature cursor-pointer",
      "col-span-1 lg:col-span-3 border-b lg:border-none group/feature cursor-pointer",
    ];
    return {
      ...service,
      skeleton: skeletons[index % skeletons.length],
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
              <FeatureTitle>{feature.title}</FeatureTitle>
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

const FeatureTitle = ({ children }: { children?: React.ReactNode }) => {
  return (
    <p className="mx-auto max-w-5xl text-left text-xl font-bold tracking-tight text-black md:text-2xl md:leading-snug">
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

export const SkeletonOne = () => {
  return (
    <div className="relative flex h-full gap-10 px-2 py-8">
      <div className="group mx-auto h-full w-full bg-white p-5 shadow-2xl border border-neutral-200 rounded-xl overflow-hidden">
        <div className="flex h-full w-full flex-1 flex-col space-y-2">
          <img
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop"
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


