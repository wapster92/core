import { BeforeInsert, BeforeUpdate, Column, Entity, JoinTable, ManyToMany, Unique } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Roles } from './roles.entity';
import * as bcrypt from 'bcrypt';

@Entity({name: 'users'})
@Unique(['username', 'email'])
export class Users extends BaseEntity {
  @Column({type: 'varchar'})
  username: string
  @Column({type: 'varchar'})
  email: string
  @Column()
  password: string
  @ManyToMany(() => Roles, r => r.id)
  @JoinTable({
    name: 'user_roles',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
  })
  roles: Roles[]
  @Column('text', {array: true, nullable: true })
  refreshTokens: string[]

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (!!this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
}
