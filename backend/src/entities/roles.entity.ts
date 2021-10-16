import { BaseEntity } from './base.entity';
import { Column, Entity } from 'typeorm';

@Entity({name: 'roles'})
export class Roles extends BaseEntity {
  @Column()
  role: string

  @Column()
  name: string

  @Column()
  description: string
}
