'use client';
// import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useState } from 'react';

import CustomModal from '@/app/_components/CustomModal';
import Tootip from '@/app/_components/Tootip';

const UserNav = () => {
  const { data } = useSession();
  const user = data?.user;
  const [isClick, setIsClick] = useState<boolean>(false);

  return (
    <div className="absolute right-0 top-0 h-[5rem] px-[1rem] hover:cursor-pointer">
      <ul className="flex h-[5rem] items-center justify-center gap-[2rem]">
        {user?.email || user?.name ? (
          <li onClick={() => signOut()}>
            <Tootip text="로그아웃">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-[3rem]"
              >
                <path d="M18 1.5c2.9 0 5.25 2.35 5.25 5.25v3.75a.75.75 0 0 1-1.5 0V6.75a3.75 3.75 0 1 0-7.5 0v3a3 3 0 0 1 3 3v6.75a3 3 0 0 1-3 3H3.75a3 3 0 0 1-3-3v-6.75a3 3 0 0 1 3-3h9v-3c0-2.9 2.35-5.25 5.25-5.25Z" />
              </svg>
            </Tootip>
          </li>
        ) : (
          <li onClick={() => signIn()}>
            <Tootip text="로그인">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-[3rem] text-white"
              >
                <path
                  fillRule="evenodd"
                  d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
                  clipRule="evenodd"
                />
              </svg>
            </Tootip>
          </li>
        )}
        <li className="" onClick={() => setIsClick(true)}>
          <Tootip text="마이페이지">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-[3rem] text-white"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                clipRule="evenodd"
              />
            </svg>
          </Tootip>
        </li>
        <li className="" onClick={() => setIsClick(true)}>
          <Tootip text="장바구니">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-[3rem] text-white"
            >
              <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
            </svg>
          </Tootip>
        </li>
      </ul>
      {isClick ? (
        <CustomModal style="w-[40rem] h-[20rem] left-2/4 top-[15%] -translate-x-2/4 rounded-xl items-center justify-center">
          <div className="flex h-[75%] flex-col items-center justify-center gap-[1rem]">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-20 text-red-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12a7.5 7.5 0 0 0 15 0m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077 1.41-.513m14.095-5.13 1.41-.513M5.106 17.785l1.15-.964m11.49-9.642 1.149-.964M7.501 19.795l.75-1.3m7.5-12.99.75-1.3m-6.063 16.658.26-1.477m2.605-14.772.26-1.477m0 17.726-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205 12 12m6.894 5.785-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495"
                />
              </svg>
            </span>
            <span className="text-[2rem]">로그인이 필요합니다!</span>
          </div>
          <button onClick={() => setIsClick(false)} className="h-[25%] w-full bg-primary-300">
            닫기
          </button>
        </CustomModal>
      ) : (
        ''
      )}
    </div>
  );
};
export default UserNav;
