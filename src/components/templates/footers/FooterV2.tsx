/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Twitter, Instagram, Youtube } from '@/components/ui/social-icons';
import { Mail, MapPin, Phone, ArrowUpRight, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useSettings } from '@/components/SettingsProvider';
import * as SocialIcons from '@/components/ui/social-icons';
import { Circle } from 'lucide-react';
import { useState, useEffect } from 'react';

const socialIconMap: Record<string, any> = {
  facebook: SocialIcons.Facebook || Circle,
  twitter: SocialIcons.Twitter || SocialIcons.X || Circle,
  instagram: SocialIcons.Instagram || Circle,
  youtube: SocialIcons.Youtube || Circle,
  linkedin: SocialIcons.Linkedin || Circle,
  tiktok: SocialIcons.Tiktok || Circle,
  whatsapp: SocialIcons.Whatsapp || Circle,
};

export default function FooterV2() {
  const currentYear = new Date().getFullYear();
  const settings = useSettings();
  const socialLinks = settings?.socialLinks || {};
  const hasSocialLinks = Object.values(socialLinks).some(v => v);

  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if running in standalone mode (already installed)
    const checkStandalone = () => {
      const isStandaloneMode =
        window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as any).standalone ||
        document.referrer.includes('android-app://');
      setIsStandalone(isStandaloneMode);
    };

    checkStandalone();

    // Detect iOS device
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(isIOSDevice);

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    const handleAppInstalled = () => {
      setDeferredPrompt(null);
      setIsStandalone(true);
      toast.success('App installed successfully!');
    };

    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (isIOS) {
      toast.info('To install this app on your iPhone/iPad: Tap the "Share" icon in Safari and select "Add to Home Screen".', {
        duration: 8000,
      });
      return;
    }

    if (!deferredPrompt) {
      toast.info('To install the app: Click your browser menu (e.g. three dots icon in Chrome) and select "Install App" or "Add to Home Screen".', {
        duration: 6000,
      });
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      toast.success('Thank you for installing our app!');
    }
    setDeferredPrompt(null);
  };

  const footerNav = settings?.footerNavigation && settings.footerNavigation.length > 0
    ? settings.footerNavigation
    : [
      { label: 'Shop All', href: '/shop' },
      { label: 'New Arrivals', href: '/shop?filter=new' },
      { label: 'Order Tracking', href: '/track-order' },
      { label: 'Contact Support', href: '/contact' }
    ];

  return (
    <footer className="bg-background border-t border-muted text-foreground pt-16 pb-8 px-6 font-jost">
      <div className="container mx-auto">
        <div className="flex flex-col items-center text-center lg:text-left lg:grid lg:grid-cols-12 lg:gap-16 mb-16 space-y-12 lg:space-y-0">

          {/* Brand Essence */}
          <div className="lg:col-span-4 space-y-6 flex flex-col items-center lg:items-start">
            <Link href="/" className="hover:scale-105 transition-all flex items-center gap-1 group">
              <div className="relative w-12 h-12 md:w-14 md:h-14 shrink-0">
                <Image src="/logo.webp" fill alt="Sheba Mart Bd Logo" className="object-contain" />
              </div>
              {(() => {
                const brand = settings?.brandName || 'Sheba Mart Bd';
                const normalized = brand.replace(/\s/g, '').toLowerCase();
                if (normalized === 'shebamartbd') {
                  return (
                    <div className="flex flex-col md:items-center items-start justify-center relative md:pb-1.5 px-1">
                      <div className="text-xl md:text-2xl font-black tracking-tight leading-none text-foreground">
                        <span className="text-primary">S</span>
                        <span>heba</span>
                        <span className="text-primary">M</span>
                        <span>artb</span>
                        <span className="text-primary">d</span>
                      </div>
                      <div
                        className="hidden md:block text-[7px] md:text-[9px] mt-1 font-medium font-sans leading-none uppercase text-center w-full text-foreground/75"
                        style={{ letterSpacing: '0.18em' }}
                      >
                        Best Quality shopping
                      </div>
                      <div className="hidden md:block absolute bottom-0 left-0 right-0 h-[2px] bg-primary" />
                    </div>
                  );
                }
                return (
                  <span className="text-2xl md:text-3xl font-black tracking-tighter text-foreground">
                    {brand}
                  </span>
                );
              })()}
            </Link>
            <p className="text-muted-foreground text-sm max-w-sm leading-relaxed font-medium">
              Your trusted destination for premium quality shopping. Bringing the best products right to your doorstep with trust and excellence.
            </p>

            {/* PWA Download App Button */}
            {!isStandalone && (
              <Button
                onClick={handleInstallClick}
                variant="outline"
                className="mt-2 rounded-full border-neutral-300 dark:border-neutral-700 text-foreground hover:bg-primary hover:text-primary-foreground font-black text-[10px] tracking-widest gap-2 h-9 px-4 uppercase transition-all duration-300"
              >
                <Download className="h-3.5 w-3.5 animate-bounce" />
                Download App
              </Button>
            )}
          </div>

          {/* Dynamic Navigation */}
          <div className="lg:col-span-5 w-full">
            <div className="flex flex-col items-center lg:items-start space-y-6">
              <h3 className="text-xs font-black uppercase tracking-[0.4em] text-foreground">Quick Links</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-3 w-full lg:w-auto">
                {footerNav.map(link => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm font-bold text-muted-foreground hover:text-primary transition-all whitespace-nowrap">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Social Icons & Policy Links */}
          <div className="lg:col-span-3 space-y-6 flex flex-col items-center lg:items-start">
            <div className="space-y-6">
              <h3 className="text-xs font-black uppercase tracking-[0.4em] text-foreground text-center lg:text-left">Connect With Us</h3>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                {hasSocialLinks ? (
                  Object.entries(socialLinks).map(([platform, url]) => {
                    if (!url) return null;
                    const Icon = socialIconMap[platform];
                    if (!Icon) return null;

                    return (
                      <Link
                        key={platform}
                        href={url as string}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-10 w-10 rounded-full border border-muted flex items-center justify-center hover:bg-primary hover:border-primary transition-all group"
                        title={platform}
                      >
                        <Icon className="h-4 w-4 text-muted-foreground group-hover:text-primary-foreground" />
                      </Link>
                    );
                  })
                ) : (
                  <p className="text-xs text-muted-foreground italic">Follow us on social media for updates.</p>
                )}
              </div>

              {/* Privacy & Terms Moved Here */}
              <div className="flex items-center justify-center lg:justify-start gap-6 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground pt-2">
                <Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
                <Link href="/terms" className="hover:text-primary transition-colors">Terms</Link>
              </div>
            </div>
          </div>
        </div>


      </div>
    </footer>
  );
}

