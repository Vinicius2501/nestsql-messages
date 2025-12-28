import { Person } from 'src/people/entities/person.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('messages')
export class MessageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  content: string;

  @ManyToOne(() => Person)
  @JoinColumn({ name: 'to' })
  to: Person;

  @ManyToOne(() => Person)
  @JoinColumn({ name: 'from' })
  from: Person;

  @Column({ type: 'bit', default: false })
  readed: boolean;

  @Column({ type: 'bit', default: false })
  isDelete: boolean;

  @CreateDateColumn({ type: 'datetime2' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime2' })
  updatedAt: Date;
}
