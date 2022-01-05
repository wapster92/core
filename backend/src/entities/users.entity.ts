import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { Roles } from './roles.entity';
import * as bcrypt from 'bcrypt';
import { RefreshTokens } from './refreshTokens.entity';

@Entity({ name: 'users' })
export class Users extends BaseEntity {
  @Column({ unique: true })
  username: string;
  @Column({ unique: true })
  email: string;
  @Column()
  password: string;
  @ManyToMany(() => Roles)
  @JoinTable({ name: 'user_roles' })
  roles: Roles[];
  @OneToMany(() => RefreshTokens, (refreshTokens) => refreshTokens.user)
  refreshTokens: RefreshTokens[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (!!this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
}
