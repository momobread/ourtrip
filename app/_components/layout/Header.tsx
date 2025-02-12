import Image from 'next/image';
import Link from 'next/link';
import UserNav from './UserNav';
import SessionWrapper from '../Session/SessionWrapper';
// import UserNav from './UserNav';

const Header = () => {
  return (
    <header className="relative h-[10rem] bg-black">
      <Link href="/" className="flex h-full w-full items-center justify-center">
        <Image src="/bg3.png" fill alt="logo" />
        <span className="absolute text-[3rem] font-semibold">Our Trip</span>
      </Link>
      <SessionWrapper>
        <UserNav />
      </SessionWrapper>
    </header>
  );
};
export default Header;
