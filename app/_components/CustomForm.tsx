'use client';

import { ReactElement } from 'react';
import { useForm, UseFormRegister } from 'react-hook-form';

import CustomInput from '@/app/_components/CustomInput';
import { type JoinMemberType, type LoginType } from '@/app/_lib/types/login';
import { signIn } from 'next-auth/react';

interface ChildProps {
  flag: boolean;
  id: keyof LoginType | keyof JoinMemberType;
  register?: UseFormRegister<LoginType | JoinMemberType>;
}

interface CustomFormProps {
  children: ReactElement<ChildProps>[];
  category: string;
  style: string;
}

const CustomForm = ({ children, style, category }: CustomFormProps) => {
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
