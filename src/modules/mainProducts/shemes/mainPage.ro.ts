import { UserRO } from '../../users/shemes/users.ro';

export class mainPageRO {
  id: number
  photo: string
  bought: boolean
  title: string
  price: number
  author: UserRO
  upVotes?: number
  downVotes?: number
}