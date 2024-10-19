// src/pages/Features.tsx
import React from "react";
import { motion } from "framer-motion";
import {
  LightningBoltIcon,
  PersonIcon,
  LockClosedIcon,
  StarIcon,
  MixIcon,
  GlobeIcon,
} from "@radix-ui/react-icons";

const features = [
  {
    name: "Lightning Fast Conversion",
    description: "Transform your PDFs into interactive flipbooks in seconds.",
    icon: LightningBoltIcon,
  },
  {
    name: "Collaborative Editing",
    description:
      "Work together with your team in real-time, seeing updates instantly.",
    icon: PersonIcon,
  },
  {
    name: "Secure Sharing",
    description:
      "Share your flipbooks securely with customizable privacy settings.",
    icon: LockClosedIcon,
  },
  {
    name: "Rich Media Integration",
    description:
      "Enhance your flipbooks with videos, audio, and interactive elements.",
    icon: StarIcon,
  },
  {
    name: "Analytics and Insights",
    description:
      "Track engagement and gather valuable insights on your content.",
    icon: MixIcon,
  },
  {
    name: "Global Accessibility",
    description:
      "Your flipbooks are accessible from any device, anywhere in the world.",
    icon: GlobeIcon,
  },
];

const Features: React.FC = () => {
  return (
    <div className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-base font-semibold leading-7 text-primary"
          >
            Powerful Features
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Everything you need to create stunning flipbooks
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-lg leading-8 text-muted-foreground"
          >
            Flip It provides a comprehensive set of tools to transform your
            static PDFs into engaging, interactive experiences that captivate
            your audience.
          </motion.p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col"
              >
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-foreground">
                  <feature.icon
                    className="h-5 w-5 flex-none text-primary"
                    aria-hidden="true"
                  />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Features;
