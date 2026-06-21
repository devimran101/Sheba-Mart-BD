'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  Globe, 
  Cpu, 
  Sparkles, 
  ExternalLink, 
  ArrowLeft,
  Mail,
  Zap,
  Code,
  Shield,
  Layers
} from 'lucide-react';
import Link from 'next/link';

export default function DeveloperInfoPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden py-16 md:py-24 px-4">
      {/* Background glowing decorations */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl -z-10 animate-pulse duration-[6000ms]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10 animate-pulse duration-[8000ms]" />

      <div className="max-w-4xl mx-auto">
        {/* Back navigation */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors mb-12 group"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Store
        </Link>

        {/* Main developer profile card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-card border border-border/60 rounded-3xl p-8 md:p-12 shadow-xl shadow-primary/5 backdrop-blur-md relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-6 opacity-10">
            <Cpu className="h-24 w-24 text-primary" />
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Logo area */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="relative w-28 h-28 md:w-32 md:h-32 shrink-0 rounded-2xl bg-muted/40 border border-border/50 flex items-center justify-center p-4 shadow-inner"
            >
              <Image 
                src="/Jia-Pixel-Logo.png" 
                alt="Jia Pixel Logo" 
                fill 
                className="object-contain p-4"
              />
            </motion.div>

            {/* Profile detail */}
            <div className="flex-1 text-center md:text-left space-y-4">
              <div className="space-y-2">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary px-3 py-1 bg-primary/10 rounded-full">
                  Primary Developer
                </span>
                <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-foreground mt-2">
                  JIA PIXEL
                </h1>
              </div>

              <p className="text-muted-foreground text-sm md:text-base leading-relaxed font-sans max-w-xl">
                Jia Pixel is a forward-thinking digital agency specializing in crafting premium, high-performance e-commerce ecosystems, customized web applications, and immersive digital branding experiences. 
              </p>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2">
                <a 
                  href="https://www.jiapixel.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/95 text-xs font-black uppercase tracking-wider px-6 py-3 rounded-full transition-all shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30"
                >
                  <Globe className="h-4 w-4" />
                  Visit Website
                  <ExternalLink className="h-3 w-3" />
                </a>

                <a 
                  href="mailto:info@jiapixel.com"
                  className="inline-flex items-center gap-2 border border-border bg-background hover:bg-muted text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-full transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Capabilities section */}
        <div className="mt-16 space-y-8">
          <div className="text-center md:text-left space-y-2">
            <h2 className="text-xl md:text-2xl font-black uppercase tracking-widest text-foreground flex items-center justify-center md:justify-start gap-2">
              <Sparkles className="h-5 w-5 text-primary" /> Engineering Standards
            </h2>
            <p className="text-xs text-muted-foreground uppercase tracking-[0.2em]">High quality solutions we deliver</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all space-y-4 group"
            >
              <div className="p-3 bg-primary/10 rounded-xl w-fit text-primary group-hover:scale-110 transition-transform">
                <Code className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-base text-foreground">Clean Architecture</h3>
              <p className="text-muted-foreground text-xs leading-relaxed">
                Structured, modular, and maintainable codebase built using modern design patterns and best-practices.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all space-y-4 group"
            >
              <div className="p-3 bg-primary/10 rounded-xl w-fit text-primary group-hover:scale-110 transition-transform">
                <Zap className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-base text-foreground">Next-Gen Speed</h3>
              <p className="text-muted-foreground text-xs leading-relaxed">
                Lightning-fast load speeds, automated image optimization, and custom-tuned server rendering.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all space-y-4 group"
            >
              <div className="p-3 bg-primary/10 rounded-xl w-fit text-primary group-hover:scale-110 transition-transform">
                <Shield className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-base text-foreground">Robust Security</h3>
              <p className="text-muted-foreground text-xs leading-relaxed">
                Implementing secure endpoints, encrypted transactions, and bulletproof user authentication.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Footer info branding */}
        <div className="mt-20 border-t border-border/40 pt-8 text-center space-y-2">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/80">
            Powered by Next.js & Tailwind CSS
          </p>
          <p className="text-[10px] text-muted-foreground/60">
            © {new Date().getFullYear()} Jia Pixel. All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
