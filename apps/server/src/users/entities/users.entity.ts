import { Flipbook } from 'src/flipbooks/entities/flipbook.entity';
import { PDF } from 'src/pdfs/entity/pdf.entity';
import { Video } from 'src/videos/entity/video.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  isGoogleAccount: boolean;

  @OneToMany(() => PDF, (pdf) => pdf.user)
  pdfs: PDF[];

  @OneToMany(() => Video, (video) => video.user)
  videos: Video[];

  @OneToMany(() => Flipbook, (flipbook) => flipbook.user)
  flipbooks: Flipbook[];
}
