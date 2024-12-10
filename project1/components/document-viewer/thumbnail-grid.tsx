"use client";

import { ThumbnailGridProps } from '@/lib/types';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export function ThumbnailGrid({ pages, onThumbnailClick, currentPage }: ThumbnailGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {pages.map((page) => (
        <div
          key={page.pageNumber}
          className={cn(
            "relative aspect-[3/4] cursor-pointer rounded-lg overflow-hidden border-2 transition-all",
            currentPage === page.pageNumber
              ? "border-primary ring-2 ring-primary ring-offset-2"
              : "border-border hover:border-primary/50"
          )}
          onClick={() => onThumbnailClick(page.pageNumber)}
        >
          <div className="absolute inset-0 bg-muted animate-pulse" />
          <Image
            src={page.imageUrl}
            alt={`Page ${page.pageNumber}`}
            fill
            className="object-cover"
            onLoad={(e) => {
              const target = e.target as HTMLImageElement;
              target.parentElement?.querySelector('.animate-pulse')?.remove();
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-background/80 p-1 text-center text-sm">
            Page {page.pageNumber}
          </div>
        </div>
      ))}
    </div>
  );
}