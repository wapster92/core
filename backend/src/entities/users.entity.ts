import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  Unique,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { Roles } from './roles.entity';
import * as bcrypt from 'bcrypt';

@Entity({ name: 'users' })
@Unique(['username', 'email'])
export class Users extends BaseEntity {
  @Column({ type: 'varchar' })
  username: string;
  @Column({ type: 'varchar' })
  email: string;
  @Column()
  password: string;
  @ManyToMany(() => Roles)
  @JoinTable({ name: 'users_roles' })
  roles: Roles[];
  @Column('text', { array: true, nullable: true })
  refreshTokens: string[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (!!this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
}
