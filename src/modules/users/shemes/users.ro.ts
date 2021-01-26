import { UserEntity } from './user.entity';

export class UserRO {
  id: number
  created: Date
  firstName: string
  lastName: string
  email: string;
  userName: string
  token?: string
  bookmarks?: UserEntity[]
}