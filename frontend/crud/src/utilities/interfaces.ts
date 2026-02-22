export type itemsType = {
  id?: number;
  title: string;
  task: string;
  complete: boolean;
};

export interface UserType {
  id: number;
  username: string;
  email: string;
  password: string;
  items: itemsType[];
}

export interface registerInputType {
  username: string;
  email: string;
  password: string;
  repassword: string;
}
export type TokenType = {
  token: string | null;
};
export interface LoginState {
  user: UserType | null;
  token: string | null;
}
export interface LoginPayload {
  username: string;
  password: string;
}
export interface updateInputType {
  username: string;
  email: string;
  password: string;
}

interface RadioOptionsType {
  label: string;
  type: "radio";
  name: string;
}
interface RadioGroup {
  radioOptions: {
    title: string;
    options: RadioOptionsType[];
  };
}
interface TextInput {
  label: string;
  type: string;
  name: string;
  placeholder?: string;
}

export type textAndRadioInput = (
  | { textInput: TextInput[]; radioInput?: never }
  | { radioInput: RadioGroup; textInput?: never }
)[];

export type UsersResponse = { users: UserType[] };
export interface TaskInputType {
  title: string;
  task: string;
  complete: boolean;
}