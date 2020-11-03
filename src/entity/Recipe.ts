import {
  Entity, 
  PrimaryGeneratedColumn,
  Column,
  ManyToOne
} from "typeorm";
import Category from './Category';

export interface UserInt {
    id: number;
    name: string;
    email: string;
    password: string;
};

@Entity()
export default class Recipe {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column({array: true})
    ingredients: string;

    @ManyToOne(type => Category, category => category.recipes)
    category: Category;

};

export type RecipeType = typeof Recipe;
