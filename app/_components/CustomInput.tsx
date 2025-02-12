'use client';

import { type UseFormRegister } from 'react-hook-form';

import { type JoinMemberType, type LoginType } from '@/app/_lib/types/login';

interface CustomInputProps {
  id: keyof LoginType | keyof JoinMemberType;
  register?: UseFormRegister<LoginType | JoinMemberType>;
  flag: boolean;
  pattern?: RegExp;
}

const CustomInput = ({ id, register, pattern }: CustomInputProps) => {
  if (typeof register === 'undefined') return;
  return (
    <input
      className="w-[90%] rounded-xl border border-accent-500 p-[0.5rem]"
      id={id}
      placeholder={id}
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
