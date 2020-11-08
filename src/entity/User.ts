/* eslint-disable require-jsdoc */
/* eslint-disable new-cap */
import {Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinTable,
  ManyToMany
} from 'typeorm';
import {Recipe} from '.';

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @ManyToMany((type => Recipe), (recipe) => recipe.users)
  @JoinTable()
  favorites: Recipe[];
};
