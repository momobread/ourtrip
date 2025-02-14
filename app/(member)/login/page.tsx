import Image from 'next/image';
import Link from 'next/link';

import CustomForm from '@/app/_components/CustomForm';
import CustomInput from '@/app/_components/CustomInput';
import MemberButtons from '@/app/_components/Member/MemberButtons';

const LoginFormStyle = `rounded-xl h-[60rem] absolute  flex w-[50rem] flex-col items-center border border-grey-400  justify-center gap-[2rem]`;

const page = () => {
  return (
    <section className="h-full">
      <Image src="/bg.jpeg" fill alt="ff" className="object-cover" />
      <div className="flex h-full justify-center">
        <CustomForm style={LoginFormStyle} category="login">
          <Link href="/" className="relative size-[10rem]">
            <Image src="/bg2.jpg" fill className="rounded-full object-cover" alt="login_logo" />
          </Link>
          <CustomInput id="id" placeholder="이메일(아이디)" flag={true} />
          <CustomInput id="password" placeholder="비밀번호" flag={true} />
          <MemberButtons />
        </CustomForm>
      </div>
    </section>
  );
};

export default page;
