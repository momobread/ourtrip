'use client';

import { type UseFormRegister } from 'react-hook-form';

import { type JoinMemberType, type LoginType } from '@/app/_lib/types/login';

interface CustomInputProps {
  id: keyof LoginType | keyof JoinMemberType;
  register?: UseFormRegister<LoginType | JoinMemberType>;
  flag: boolean;
  pattern?: RegExp;
  placeholder: string;
}

const CustomInput = ({ id, register, pattern, placeholder }: CustomInputProps) => {
  if (typeof register === 'undefined') return;
  return (
    <input
      className="w-[90%] rounded-xl border border-accent-500 p-[0.5rem]"
      id={id}
      placeholder={placeholder}
      {...register(
        id,
        pattern
          ? {
              required: 'ddd',
              pattern: {
                value: pattern,
                message: '',
              },
            }
          : {}
      )}
    />
  );
};

export default CustomInput;
