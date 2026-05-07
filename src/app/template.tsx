import type { ReactNode } from "react";

export default function PageTransitionTemplate({ children }: { children: ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
