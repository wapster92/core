import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Users } from './users.entity';

@Entity()
export class RefreshTokens {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users, (user) => user.refreshTokens)
  user: Users;

  @Column({ type: 'mediumtext' })
  token: string;
}
