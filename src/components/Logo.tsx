import Image from "next/image";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Image 
      src="/logo.png" 
      alt="Taji Food Truck Logo" 
      width={120}
      height={120}
      className={`${className} object-contain`}
      priority
    />
  );
}
