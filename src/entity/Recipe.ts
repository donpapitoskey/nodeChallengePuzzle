/* eslint-disable no-unused-vars */
/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User, Category } from '.';

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

    @ManyToMany((type) => User, (user) => user.favorites)
    users: User[]
};
