/* eslint-disable require-jsdoc */
/* eslint-disable new-cap */
import {Entity,
  PrimaryGeneratedColumn,
  Column, OneToMany, JoinTable,
} from 'typeorm';
import Recipe from './Recipe';

@Entity()
export default class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
  name: string;

  @OneToMany((type) => Recipe, (recipe) => recipe.category)
  @JoinTable()
  recipes: Recipe[];
};
