// import { useTranslation } from 'next-i18next';
// import Image from 'next/image';
import Link from 'next/link';
// import { useRouter } from 'next/router';
// import { useRef } from 'react';
import type { IconType } from 'react-icons';
import {  FiPhone } from 'react-icons/fi';
import { MdOutlineMail } from "react-icons/md";
import { TiSocialFacebook } from "react-icons/ti";
import { TiSocialLinkedin } from "react-icons/ti";
import { VscTwitter } from "react-icons/vsc";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";
// import { FaLinkedinIn } from "react-icons/fa6";

// import { LocaleSelector } from './LocaleSelector';

interface TopbarItemProps {
  label: string;
  url: string;
  Icon?: IconType;
}

const TopbarItem = ({ label, url, Icon }: TopbarItemProps) => (
  <li className="mx-1 pb-px md:mr-2.5 lg:[&:nth-of-type(3)]:mr-10 lg:[&:nth-of-type(5)]:mr-10">
    <Link
      href={url}
      className="flex items-center transition-colors hover:text-white text-white"
    >
      {Icon && <Icon className="mx-1 md:text-sm"></Icon>}
      <span>{label}</span>
    </Link>
  </li>
);

const SocialItem = ({ url, Icon }: TopbarItemProps) => (
  <li className="mx-0.5">
    <Link
      href={url}
      className="flex items-center transition-colors hover:text-white hover:bg-gray-600 text-white bg-black h-[22px] rounded"
    >
      {Icon && <Icon className="mx-1 md:text-sm"></Icon>}
      {/* <span>{label}</span> */}
    </Link>
  </li>
);

export const TopBar = () => {

  // const router = useRouter();
  // const { t } = useTranslation('header');
  // const ref = useRef<HTMLDivElement>(null);

  

  const topbarItems: TopbarItemProps[] = [
    // { label: t('topbar.careers'), url: 'careers' },
    // { label: t('topbar.help'), url: 'help' },
    // { label: t('topbar.buyer'), url: 'buyer' },
    {
      label: 'info@bjsignworld.com',
      url: 'mailto:info@bjsignworld.com',
      Icon: MdOutlineMail,
    },
    { label: '+1(707)761-7464', url: 'tel:+1(707)761-7464', Icon: FiPhone },
  ];

    const socialIcon: TopbarItemProps[] = [
    {
      label:'Facebook',
      url: '',
      Icon: TiSocialFacebook,
    },
    { label: 'Instagram', url: 'tel:+1(707)761-7464', Icon:FaInstagram  },
    { label: 'Youtube', url: 'tel:+1(707)761-7464', Icon: FaYoutube },
    { label: 'Twitter', url: 'tel:+1(707)761-7464', Icon: VscTwitter },
    { label: 'Linkedin', url: 'tel:+1(707)761-7464', Icon: TiSocialLinkedin },
  ];

  return (
    <div className="bg-orange-400 text-[10px] text-gray-300 md:text-xs">
      <div className="mx-auto flex flex-col items-center px-4 py-1 xl:container md:flex-row md:py-2.5">
        {/* <p className="pb-2 md:pb-0">{t('topbar.discount')}</p> */}
        <ul className="flex flex-wrap justify-center md:mr-auto">
          {topbarItems.map(item => (
            <TopbarItem key={item.label} {...item} />
          ))}
       
        </ul>
        <ul className="flex flex-wrap justify-center md:ml-auto">
          {socialIcon.map(item => (
            <SocialItem key={item.label} {...item} />
          ))}
       
        </ul>
      </div>
    </div>
  );
};
