import {Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinTable} from "typeorm";
import Recipe from './Recipe';

export interface CategoryInt {
    id: number;
    name: string;
    recipes: typeof Recipe;
};

@Entity()
export default class Category {

    @PrimaryGeneratedColumn() id: number;

    @Column()
    name: string;

    @OneToMany(type => Recipe, recipe => recipe.category)
    recipes: Recipe[];

};

export type CategoryType = typeof Category;
