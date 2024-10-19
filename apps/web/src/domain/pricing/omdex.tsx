// src/pages/Pricing.tsx
import React from "react";
import { motion } from "framer-motion";
import { CheckIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

const tiers = [
  {
    name: "Starter",
    id: "tier-starter",
    href: "#",
    priceMonthly: "Free",
    description: "Everything necessary to get started.",
    features: ["5 flipbooks", "Basic analytics", "Email support"],
  },
  {
    name: "Professional",
    id: "tier-professional",
    href: "#",
    priceMonthly: "$30",
    description: "Perfect for growing businesses.",
    features: [
      "Unlimited flipbooks",
      "Advanced analytics",
      "Priority support",
      "Custom branding",
    ],
  },
  {
    name: "Enterprise",
    id: "tier-enterprise",
    href: "#",
    priceMonthly: "Custom",
    description: "Dedicated support and infrastructure.",
    features: [
      "Unlimited flipbooks",
      "Advanced analytics & reporting",
      "24/7 phone support",
      "Custom integrations",
      "Service Level Agreement (SLA)",
    ],
  },
];

const Pricing: React.FC = () => {
  return (
    <div className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-base font-semibold leading-7 text-primary"
          >
            Pricing
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-2 text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
          >
            Choose the right plan for&nbsp;you
          </motion.p>
        </div>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-muted-foreground"
        >
          Whether you're just starting out or running a large organization, we
          have a plan that's right for you.
        </motion.p>
        <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {tiers.map((tier, tierIdx) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: tierIdx * 0.1 }}
              className="flex flex-col justify-between rounded-3xl bg-card p-8 ring-1 ring-muted-foreground/10 xl:p-10"
            >
              <div>
                <div className="flex items-center justify-between gap-x-4">
                  <h3 className="text-lg font-semibold leading-8 text-foreground">
                    {tier.name}
                  </h3>
                </div>
                <p className="mt-4 text-sm leading-6 text-muted-foreground">
                  {tier.description}
                </p>
                <p className="mt-6 flex items-baseline gap-x-1">
                  {tier.priceMonthly == "Free" ? (
                    <span className="text-4xl font-bold tracking-tight text-foreground">
                      {tier.priceMonthly}
                    </span>
                  ) : (
                    <>
                      <span className="text-4xl font-bold tracking-tight text-foreground">
                        {tier.priceMonthly}
                      </span>

                      <span className="text-sm font-semibold leading-6 text-muted-foreground">
                        /month
                      </span>
                    </>
                  )}
                </p>
                <ul
                  role="list"
                  className="mt-8 space-y-3 text-sm leading-6 text-muted-foreground"
                >
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <CheckIcon
                        className="h-6 w-5 flex-none text-primary"
                        aria-hidden="true"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <Button
                className="mt-8"
                variant={tierIdx === 1 ? "default" : "outline"}
              >
                Get started
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
