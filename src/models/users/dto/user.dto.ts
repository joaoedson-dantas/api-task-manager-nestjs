export interface CreateUserDTO {
  username: string;
  password: string;
  email: string;
  name: string;
}

export interface UsernameAndEmail {
  email: string;
  username: string;
}

export interface UserCreatedDTO extends CreateUserDTO {
  id: string;
  createdAt: Date;
}
