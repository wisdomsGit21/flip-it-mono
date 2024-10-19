import React from "react";
import { motion } from "framer-motion";
import { CheckIcon } from "@radix-ui/react-icons";

const HowItWorksSection: React.FC = () => {
  return (
    <div className="py-16 bg-secondary overflow-hidden lg:py-24">
      <div className="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <h2 className="text-center text-3xl leading-8 font-extrabold tracking-tight text-foreground sm:text-4xl">
            How Flip It Works
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-center text-xl text-muted-foreground">
            Transform your PDFs into interactive flipbooks in just a few simple
            steps.
          </p>
        </motion.div>

        <div className="relative mt-12 lg:mt-24 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <h3 className="text-2xl font-extrabold text-foreground tracking-tight sm:text-3xl">
              Upload and Convert
            </h3>
            <p className="mt-3 text-lg text-muted-foreground">
              Simply upload your PDF to our platform. Our advanced technology
              will quickly convert it into an interactive flipbook, preserving
              your original layout and design.
            </p>

            <dl className="mt-10 space-y-10">
              {["Maintain Quality", "Quick Processing"].map((item, index) => (
                <div key={item} className="relative">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-primary-foreground">
                      <CheckIcon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-foreground">
                      {item}
                    </p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-muted-foreground">
                    {index === 0
                      ? "Our conversion process ensures that your content retains its original quality and resolution."
                      : "Experience lightning-fast conversion times, even for large documents."}
                  </dd>
                </div>
              ))}
            </dl>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-10 -mx-4 relative lg:mt-0"
            aria-hidden="true"
          >
            <img
              className="relative mx-auto"
              width={490}
              src="https://images.unsplash.com/photo-1600267185393-e158a98703de?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              alt="Upload and convert process"
            />
          </motion.div>
        </div>

        <div className="relative mt-12 sm:mt-16 lg:mt-24">
          <div className="lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:gap-8 lg:items-center">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-start-2"
            >
              <h3 className="text-2xl font-extrabold text-foreground tracking-tight sm:text-3xl">
                Customize and Enhance
              </h3>
              <p className="mt-3 text-lg text-muted-foreground">
                Take your flipbook to the next level by adding interactive
                elements, videos, and custom branding.
              </p>

              <dl className="mt-10 space-y-10">
                {["Embed Rich Media", "Custom Branding"].map((item, index) => (
                  <div key={item} className="relative">
                    <dt>
                      <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-primary-foreground">
                        <CheckIcon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <p className="ml-16 text-lg leading-6 font-medium text-foreground">
                        {item}
                      </p>
                    </dt>
                    <dd className="mt-2 ml-16 text-base text-muted-foreground">
                      {index === 0
                        ? "Easily add videos, audio, and interactive elements to create an immersive experience."
                        : "Apply your brand colors, logos, and custom designs to make your flipbook truly yours."}
                    </dd>
                  </div>
                ))}
              </dl>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-10 -mx-4 relative lg:mt-0 lg:col-start-1"
            >
              <img
                className="relative mx-auto"
                width={490}
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                alt="Customize and enhance process"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksSection;
