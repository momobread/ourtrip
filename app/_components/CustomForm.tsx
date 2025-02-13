'use client';

import axios from 'axios';
import { signIn } from 'next-auth/react';
import { ReactElement } from 'react';
import { useForm, UseFormRegister } from 'react-hook-form';

import CustomInput from '@/app/_components/CustomInput';
import { type JoinMemberType, type LoginType } from '@/app/_lib/types/login';
import { useRouter } from 'next/navigation';

interface ChildProps {
  flag: boolean;
  id: keyof LoginType | keyof JoinMemberType;
  register?: UseFormRegister<LoginType | JoinMemberType>;
  placeholder: string;
}

interface CustomFormProps {
  children: ReactElement<ChildProps>[];
  category: string;
  style: string;
}

const CustomForm = ({ children, style, category }: CustomFormProps) => {
  const router = useRouter();
  const { handleSubmit, register } = useForm<LoginType | JoinMemberType>();
  const onSubmit = async (data: LoginType | JoinMemberType) => {
    if (category === 'login') {
      console.log('들어옴');
      const result = await signIn('credentials', {
        id: data?.id,
        password: data?.password,
      });
    }
    if (category === 'join') {
      const { email, birth, gender, name, nickname, password, safePassword, phoneNumber } =
        data as JoinMemberType;

      try {
        const response = await axios.post(`/api/member/signup`, {
          email,
          birth,
          gender,
          name,
          nickname,
          password,
          safePassword,
          phoneNumber,
        });
        console.log(response);
        if (!response.data?.user) throw new Error('회원가입실패');

        const user = response?.data?.user;
        const loginResponse = await signIn('credentials', {
          id: user?.user?.email,
          password: user?.user?.user_metadata?.safePassword,
        });
      } catch (e) {
        console.log(e);
        router.push('/');
      }
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`${style}`}>
      {children?.map((child) =>
        child?.props?.flag ? (
          <CustomInput {...child.props} register={register} key={child.props.id} />
        ) : (
          child
        )
      )}
    </form>
  );
};
export default CustomForm;
