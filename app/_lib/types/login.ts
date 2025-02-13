interface LoginType {
  id: string;
  password: string;
}

interface JoinMemberType extends LoginType {
  safePassword: string;
  email: string;
  nickname: string;
  name: string;
  birth: Date;
  phoneNumber: string;
  gender: string;
  
}

export type { LoginType, JoinMemberType };
