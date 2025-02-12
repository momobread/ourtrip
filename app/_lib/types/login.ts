interface LoginType {
  id: string;
  password: string;
}

interface JoinMemberType extends LoginType {
  email: string;
  nickname: string;
  name: string;
}

export type { LoginType, JoinMemberType };
