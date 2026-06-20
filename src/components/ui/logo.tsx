"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useSettings } from '@/components/SettingsProvider';

interface LogoProps {
  className?: string;
  imageClassName?: string;
  textClassName?: string;
  showText?: boolean;
  onClick?: () => void;
  sizes?: string;
  src?: string;
  hideTagline?: boolean;
}

export function Logo({ className, imageClassName, textClassName, showText = true, onClick, sizes, src, hideTagline = false }: LogoProps) {
  const { brandName, logoUrl } = useSettings();

  const finalBrandName = brandName || "Sheba Mart Bd";
  const finalLogoUrl = src || logoUrl || "/logo.webp";

  const isCustomBrand = finalBrandName.replace(/\s/g, '').toLowerCase() === 'shebamartbd';

  return (
    <Link href="/" className={cn("flex items-center gap-1 group", className)} onClick={onClick}>
      <div className={cn("relative flex items-center justify-center overflow-hidden transition-transform group-hover:scale-110 size-12 md:size-14 shrink-0", imageClassName)}>
        <Image
          src={finalLogoUrl}
          alt={`${finalBrandName} Logo`}
          fill
          sizes={sizes || "(max-width: 768px) 48px, 56px"}
          className="object-contain"
          quality={80}
          priority
        />
      </div>
      {showText && (
        <>
          {isCustomBrand ? (
            <div className={cn(
              "flex flex-col justify-center px-1",
              !hideTagline && "md:items-center items-start relative md:pb-1.5"
            )}>
              <div className={cn("text-xl md:text-2xl font-black tracking-tight leading-none text-foreground", textClassName)}>
                <span className="text-primary">S</span>
                <span>heba</span>
                <span className="text-primary">M</span>
                <span>artb</span>
                <span className="text-primary">d</span>
              </div>
              {!hideTagline && (
                <>
                  <div 
                    className="hidden md:block text-[7px] md:text-[9px] mt-1 font-medium font-sans leading-none uppercase text-center w-full text-foreground/75"
                    style={{ letterSpacing: '0.18em' }}
                  >
                    Best Quality shopping
                  </div>
                  <div className="hidden md:block absolute bottom-0 left-0 right-0 h-[2px] bg-primary" />
                </>
              )}
            </div>
          ) : (
            <span className={cn(
              "text-xl md:text-2xl uppercase text-foreground transition-colors group-hover:text-primary font-black tracking-tighter font-logo",
              textClassName
            )}>
              {finalBrandName}
            </span>
          )}
        </>
      )}
    </Link>
  );
}

