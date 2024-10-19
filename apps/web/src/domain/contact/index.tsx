// src/pages/Contact.tsx
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  EnvelopeClosedIcon,
  HomeIcon,
  CrumpledPaperIcon,
} from "@radix-ui/react-icons";

const Contact: React.FC = () => {
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
            Contact Us
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Get in touch with our team
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-lg leading-8 text-muted-foreground"
          >
            We're here to help and answer any question you might have. We look
            forward to hearing from you.
          </motion.p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="lg:order-last"
            >
              <form action="#" method="POST" className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-foreground"
                  >
                    Name
                  </label>
                  <div className="mt-2">
                    <Input
                      type="text"
                      name="name"
                      id="name"
                      autoComplete="name"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-foreground"
                  >
                    Email
                  </label>
                  <div className="mt-2">
                    <Input
                      type="email"
                      name="email"
                      id="email"
                      autoComplete="email"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium leading-6 text-foreground"
                  >
                    Message
                  </label>
                  <div className="mt-2">
                    <Textarea name="message" id="message" rows={4} required />
                  </div>
                </div>
                <div>
                  <Button type="submit" className="w-full">
                    Send message
                  </Button>
                </div>
              </form>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-lg font-semibold leading-8 text-foreground">
                  Contact Information
                </h3>
                <dl className="mt-4 space-y-4 text-base leading-7 text-muted-foreground">
                  <div className="flex gap-x-4">
                    <dt className="flex-none">
                      <span className="sr-only">Address</span>
                      <HomeIcon
                        className="h-7 w-6 text-primary"
                        aria-hidden="true"
                      />
                    </dt>
                    <dd>
                      123 Flip Street
                      <br />
                      San Francisco, CA 94107
                    </dd>
                  </div>
                  <div className="flex gap-x-4">
                    <dt className="flex-none">
                      <span className="sr-only">Telephone</span>
                      <CrumpledPaperIcon
                        className="h-7 w-6 text-primary"
                        aria-hidden="true"
                      />
                    </dt>
                    <dd>
                      <a
                        className="hover:text-primary"
                        href="tel:+1 (555) 234-5678"
                      >
                        +1 (555) 234-5678
                      </a>
                    </dd>
                  </div>
                  <div className="flex gap-x-4">
                    <dt className="flex-none">
                      <span className="sr-only">Email</span>
                      <EnvelopeClosedIcon
                        className="h-7 w-6 text-primary"
                        aria-hidden="true"
                      />
                    </dt>
                    <dd>
                      <a
                        className="hover:text-primary"
                        href="mailto:hello@flipit.com"
                      >
                        hello@flipit.com
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>
              <div>
                <h3 className="text-lg font-semibold leading-8 text-foreground">
                  Office Hours
                </h3>
                <dl className="mt-4 space-y-4 text-base leading-7 text-muted-foreground">
                  <div>
                    <dt className="font-semibold text-foreground">
                      Monday-Friday:
                    </dt>
                    <dd>9:00 AM - 5:00 PM (PST)</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-foreground">
                      Saturday-Sunday:
                    </dt>
                    <dd>Closed</dd>
                  </div>
                </dl>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
