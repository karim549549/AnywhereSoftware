'use client';

import React from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  const locale = useLocale();
  return (
    <Link href={`/${locale}/`}>
      <h1
        className={`text-2xl font-bold italic bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text ${className || ''}`}
      >
        Anywhere Software
      </h1>
    </Link>
  );
};

export default Logo;
