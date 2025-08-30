import type { SVGProps } from 'react';

export function FarmerIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M14.5 9.5 9.5 15.5" />
      <path d="M7.5 13.5a2.5 2.5 0 0 0-5 0V19a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-5.5a2.5 2.5 0 0 0-1-2Z" />
      <path d="M15.5 12.5a2.5 2.5 0 0 0-5 0V19a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-6.5a2.5 2.5 0 0 0-1-2Z" />
      <path d="M14 9c0-2.5-1.5-5-3-5s-3 2.5-3 5" />
      <path d="m14.5 12.5-5 5" />
    </svg>
  );
}
