import { BaseEntity } from './base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'orders' })
export class Orders extends BaseEntity {
  @Column()
  name: string;
  @Column({ type: 'timestamp', default: null })
  deadline: Date;
  @Column()
  company: string;
  @Column()
  amount: number;
  @Column({ type: 'boolean', default: false })
  completed: boolean;
}
