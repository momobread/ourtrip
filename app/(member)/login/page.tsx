import Image from 'next/image';

import CustomForm from '@/app/_components/CustomForm';
import CustomInput from '@/app/_components/CustomInput';
import MemberButtons from '@/app/_components/Member/MemberButtons';

const LoginFormStyle = `h-[60rem] absolute  flex w-[50rem] flex-col items-center border border-grey-400  justify-center gap-[2rem]`;

const page = () => {
  return (
    <section className="">
      <Image src="/bg.jpeg" fill alt="ff" className="object-cover" />
      <div className="flex h-full justify-center">
        <CustomForm style={LoginFormStyle} category="login">
          <div className="relative size-[10rem]">
            <Image src="/bg2.jpg" fill className="rounded-full object-cover" alt="login_logo" />
          </div>
          <CustomInput id="id" flag={true} />
          <CustomInput id="password" flag={true} />
          <MemberButtons />
        </CustomForm>
      </div>
    </section>
  );
};

export default page;
