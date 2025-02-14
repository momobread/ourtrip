'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { ReactElement, useState } from 'react';
import { useForm, UseFormRegister } from 'react-hook-form';

import CustomInput from '@/app/_components/CustomInput';
import { type JoinMemberType, type LoginType } from '@/app/_lib/types/login';

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
  // eslint-disable-next-line
  const [error, setError] = useState<any>('');
  const { handleSubmit, register } = useForm<LoginType | JoinMemberType>();

  const onSubmit = async (data: LoginType | JoinMemberType) => {
    if (category === 'login') {
      const result = await signIn('credentials', {
        id: data?.id,
        password: data?.password,
        redirect: false,
      });
      console.log(result);
      if (!result?.ok) setError(result?.error);
      else {
        router.push('/');
      }
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
          redirect: false,
        });
        if (!loginResponse?.ok) throw new Error('로그인실패2');
        router.push('/');
      } catch (e) {
        console.log(e);
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
      {error && <span className="text-red-300">{error}</span>}
    </form>
  );
};
export default CustomForm;
