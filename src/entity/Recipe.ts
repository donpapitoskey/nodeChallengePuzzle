/* eslint-disable no-unused-vars */
/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinTable,
} from 'typeorm';
import Category from './Category';

@Entity()
export default class Recipe {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    name: string;

    @Column()
    description: string;

    @Column({array: true})
    ingredients: string;

    @ManyToOne((type) => Category, (category) => category.recipes)
    @JoinTable()
    category: Category;
};
