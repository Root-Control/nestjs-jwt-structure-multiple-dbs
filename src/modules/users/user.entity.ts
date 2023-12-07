import { Column, Entity } from 'typeorm';
import { RoleType } from './types/user.types';
import { Base } from 'src/@base/entity/base.entity';

@Entity({ name: 'users' })
export class UserEntity extends Base {
  @Column({ nullable: true, type: 'varchar' })
  firstName!: string | null;

  @Column({ nullable: true, type: 'varchar' })
  lastName!: string | null;

  @Column({ type: 'enum', enum: RoleType, default: RoleType.USER })
  role!: RoleType;

  @Column({ unique: true, nullable: false, type: 'varchar' })
  email!: string;

  @Column({ nullable: true, type: 'varchar' })
  password!: string | null;

  @Column({ nullable: true, type: 'varchar' })
  phone!: string | null;

  @Column({ nullable: true, type: 'varchar' })
  avatar!: string | null;
}
