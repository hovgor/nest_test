import { UsersEntityBase } from 'src/modules/users/repository/users.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ schema: 'default', name: 'Authentication' })
export class AuthenticationEntityBase extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: null, nullable: true, name: 'access_token' })
  accessToken: string;

  @Column({ default: null, nullable: true, name: 'refresh_token' })
  refreshToken: string;

  @ManyToOne(() => UsersEntityBase, (user) => user.authenticationEntity, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  userId: number;

  @CreateDateColumn({
    name: 'created_date',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_date',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updatedAt: Date;
}
