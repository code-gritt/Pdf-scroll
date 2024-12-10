"use client";

import { DocumentPreviewProps } from '@/lib/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import Image from 'next/image';

export function DocumentPreview({ pages, currentPage }: DocumentPreviewProps) {
  const currentPageData = pages.find(page => page.pageNumber === currentPage);

  if (!currentPageData) return null;

  return (
    <ScrollArea className="h-full w-full">
      <div className="relative aspect-[3/4] w-full max-w-4xl mx-auto">
        <div className="absolute inset-0 bg-muted animate-pulse" />
        <Image
          src={currentPageData.imageUrl}
          alt={`Page ${currentPageData.pageNumber}`}
          fill
          className="object-contain"
          onLoad={(e) => {
            const target = e.target as HTMLImageElement;
            target.parentElement?.querySelector('.animate-pulse')?.remove();
          }}
        />
      </div>
    </ScrollArea>
  );
}