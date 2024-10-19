// src/flipbooks/entities/flipbook.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from 'src/users/entities/users.entity';
import { PDF } from 'src/pdfs/entity/pdf.entity';
import { Video } from 'src/videos/entity/video.entity';

@Entity()
export class Flipbook {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => PDF, { eager: true })
  pdf: PDF;

  @ManyToOne(() => Video, { eager: true })
  video: Video;

  @Column('jsonb')
  videoPosition: {
    x: number;
    y: number;
    width: number;
    height: number;
    page: number;
  };

  @ManyToOne(() => User, (user) => user.flipbooks)
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
