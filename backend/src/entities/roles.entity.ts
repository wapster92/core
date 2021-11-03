import { BaseEntity } from './base.entity';
import { Column, Entity, ManyToMany } from 'typeorm';
import { Users } from './users.entity';

@Entity({name: 'roles'})
export class Roles extends BaseEntity {
  @Column()
  role: string

  @Column()
  name: string

  @Column({nullable: true})
  description: string

  @ManyToMany(() => Users, users => users.roles)
  users: Users[]
}
