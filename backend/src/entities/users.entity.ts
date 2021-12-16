import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { Roles } from './roles.entity';
import * as bcrypt from 'bcrypt';

@Entity({ name: 'users' })
export class Users extends BaseEntity {
  @Column()
  username: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @ManyToMany(() => Roles)
  @JoinTable({ name: 'user_roles' })
  roles: Roles[];
  @Column({ type: 'simple-array', default: null })
  refreshTokens: string[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (!!this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
}
