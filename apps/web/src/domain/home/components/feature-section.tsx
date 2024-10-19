import React from "react";
import { motion } from "framer-motion";
import {
  LightningBoltIcon,
  PersonIcon,
  LockClosedIcon,
  StarIcon,
} from "@radix-ui/react-icons";

const features = [
  {
    name: "Lightning Fast Conversion",
    description:
      "Upload your PDF and watch it transform into an interactive flipbook in seconds.",
    icon: LightningBoltIcon,
  },
  {
    name: "Collaborative Editing",
    description:
      "Work together with your team in real-time. Add comments, make changes, and see updates instantly.",
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
];

const FeatureSection: React.FC = () => {
  return (
    <div className="py-12 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:text-center"
        >
          <h2 className="text-base text-primary font-semibold tracking-wide uppercase">
            Features
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-foreground sm:text-4xl">
            A better way to showcase your content
          </p>
          <p className="mt-4 max-w-2xl text-xl text-muted-foreground lg:mx-auto">
            Flip It provides a suite of powerful tools to transform your static
            PDFs into dynamic, interactive experiences.
          </p>
        </motion.div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-primary-foreground">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-foreground">
                    {feature.name}
                  </p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-muted-foreground">
                  {feature.description}
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
