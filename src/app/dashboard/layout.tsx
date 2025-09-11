
import type { ReactNode } from 'react';

// This layout no longer needs to check for authentication.
export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
