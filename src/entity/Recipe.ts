/* eslint-disable no-unused-vars */
/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import Category from './Category';

enum Unit {
  g='g',
  ml='ml',
  teaspoon='teaspoon',
  tablespoon='tablespoon',
  unit='unit'
}

@Entity()
export default class Recipe {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    name: string;

    @Column()
    description: string;

    @Column({type: 'simple-json'})
    ingredients: {name: string, qty: number, unit: Unit};

    @ManyToOne((type) => Category, (category) => category.recipes)
    category: Category;
};
