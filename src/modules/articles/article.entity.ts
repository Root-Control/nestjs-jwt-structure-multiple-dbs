import { Base } from 'src/@base/entity/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'articles' })
export class Article extends Base {
  @Column()
  title: string;

  @Column()
  content: string;
}
