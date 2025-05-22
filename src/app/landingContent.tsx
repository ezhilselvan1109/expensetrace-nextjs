"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

// animation configs
const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  animate: {
    transition: { staggerChildren: 0.15 },
  },
};

export default function LandingContent() {
  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/" className="text-xl font-bold text-blue-600 dark:text-blue-300">
            ExpenseTrace
          </Link>
        </motion.div>
      </header>

      <main className="flex flex-col pt-24 bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300">
        <motion.section
          className="mt-20 pb-20 space-y-12 px-4 md:px-6 text-center"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
        >
          <motion.div className="container mx-auto space-y-6" variants={staggerContainer}>
            <motion.span className="inline-block rounded-full px-4 py-1 text-sm font-medium bg-blue-100 text-blue-600" variants={fadeInUp}>
              Take control of your finances
            </motion.span>

            <motion.h1 className="mx-auto max-w-5xl text-4xl font-bold md:text-6xl lg:text-7xl" variants={fadeInUp}>
              Your personal expense tracker to master your money
            </motion.h1>

            <motion.p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-400 md:text-lg" variants={fadeInUp}>
              Easily track your spending, visualize trends, and manage your budget—all in one place.
            </motion.p>

            <motion.div className="flex flex-col sm:flex-row gap-4 justify-center" variants={fadeInUp}>
              <Link href="/signin" className="inline-flex items-center gap-2 rounded-lg px-6 py-3 bg-blue-600 text-white hover:bg-blue-700 transition">
                Get Started Free
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link href="#how-it-works" className="inline-flex items-center gap-2 rounded-lg px-6 py-3 border border-blue-600 text-blue-600 hover:bg-blue-50 transition">
                Learn More
              </Link>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* You can apply the same motion structure to Features, How it Works, and CTA sections */}
      </main>

      <footer className="border-t bg-gray-50 dark:bg-gray-900 py-12 text-center text-sm text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} ExpenseTrace. All rights reserved.
      </footer>
    </>
  );
}
