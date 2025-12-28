export class MessageEntity {
  id: number;
  content: string;
  to: string;
  from: string;
  readed: boolean;
  createdAt: Date;
  updatedAt: Date;
}
