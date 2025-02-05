// import { JSX, ReactNode } from 'react';

import Image from 'next/image';
import Link from 'next/link';

// const StyledHeader = styled.header`
//   padding: 1rem 0;
//   /* background-color: var(--primary-900); */
//   background-image: url('/bg2.jpg');
//   background-size: cover;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   #header_main {
//     /* background-color: aqua; */
//   }
//   #title {
//     font-size: 5rem;
//     font-weight: 500;
//     color: #fff;
//     padding: 0 0.5rem;
//     white-space: nowrap;
//     width: fit-content;
//     /* padding: 0 1rem; */
//     /* background-color: aliceblue; */
//   }
//   #s_title {
//     font-weight: 500;
//     font-size: 2.5rem;
//     color: #fff;
//   }
//   &:hover {
//     cursor: pointer;
//   }
// `;

const Header = () => {
  return (
    <header className="relative bg-black">
      <Link href="/" className="flex h-full w-full items-center justify-center">
        <Image src="/main_bg.png" fill alt="logo" />
        <span className="absolute text-[3rem] font-semibold">Our Trip</span>
      </Link>
    </header>
  );
};
export default Header;
