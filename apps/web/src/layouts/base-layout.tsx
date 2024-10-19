import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import React from "react";
import { Outlet } from "react-router-dom";

const BaseLayout: React.FC = () => {
  return (
    <main className="min-h-screen bg-background font-raleway flex flex-col">
      <Navbar />
      <section className="flex-grow">
        <Outlet />
      </section>
      <Footer />
    </main>
  );
};

export default BaseLayout;
