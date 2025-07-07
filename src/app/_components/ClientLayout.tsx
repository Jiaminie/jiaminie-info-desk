'use client';

import ShukaPattern from "@/components/common/ShukaPattern";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <ShukaPattern className="fixed inset-0 z-0 pointer-events-none bg-black/90" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
