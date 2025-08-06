'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

const LanguageSwitcher: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  const handleLocaleChange = (newLocale: string) => {
    // Construct the new path with the selected locale
    // The pathname already includes the current locale due to the [locale] segment
    // So we replace the current locale segment with the new one
    const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <ButtonGroup variant="contained" aria-label="language switcher button group">
      <Button
        onClick={() => handleLocaleChange('en')}
        disabled={currentLocale === 'en'}
        sx={{ backgroundColor: currentLocale === 'en' ? 'primary.dark' : 'primary.main' }}
      >
        EN
      </Button>
      <Button
        onClick={() => handleLocaleChange('ar')}
        disabled={currentLocale === 'ar'}
        sx={{ backgroundColor: currentLocale === 'ar' ? 'primary.dark' : 'primary.main' }}
      >
        AR
      </Button>
    </ButtonGroup>
  );
};

export default LanguageSwitcher;
