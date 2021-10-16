import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Roles } from './roles.entity';

@Entity({name: 'users'})
export class Users extends BaseEntity {
  @Column({type: 'varchar', unique: true})
  username: string
  @Column({type: 'varchar', unique: true})
  email: string
  @Column()
  password: string
  @ManyToMany(() => Roles)
  @JoinTable({name: 'user_roles'})
  roles: Roles[]
}
