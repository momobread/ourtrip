import Image from 'next/image';

import CustomForm from '@/app/_components/CustomForm';
import CustomInput from '@/app/_components/CustomInput';

const FormStyle = `w-[50rem] border-grey-50 border z-9999 h-[60rem] absolute rounded-xl flex flex-col items-center gap-4 justify-center`;

const page = () => {
  return (
    <section className="h-full">
      <Image src="/bg.jpeg" fill alt="ff" className="" />
      <div className="flex justify-center">
        <CustomForm category="join" style={FormStyle}>
          <CustomInput placeholder="이메일(아이디)" id="email" flag={true} />
          <CustomInput placeholder="비밀번호" id="password" flag={true} />
          <CustomInput placeholder="비밀번호 확인" id="safePassword" flag={true} />
          <CustomInput placeholder="이름" id="name" flag={true} />
          <CustomInput placeholder="성별" id="gender" flag={true} />
          <CustomInput placeholder="생일" id="birth" flag={true} />
          <CustomInput placeholder="전화번호" id="phoneNumber" flag={true} />
          <CustomInput placeholder="닉네임" id="nickname" flag={true} />
          <button className="mt-[2rem] h-[5rem] w-[15rem] rounded-lg border border-primary-200 text-[2rem] font-bold text-grey-0">
            회원가입
          </button>
        </CustomForm>
      </div>
    </section>
  );
};
export default page;
