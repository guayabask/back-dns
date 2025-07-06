import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  message: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  emailDomain: string | null;

  @Column({ type: 'boolean', default: false })
  isValidEmail: boolean;

  @Column({ type: 'boolean', default: false, nullable: true })
  isDisposable: boolean | null;


  @Column({ type: 'json', nullable: true })
  deliverability: any;

  @Column({ default: false })
  confirmed: boolean;

}
