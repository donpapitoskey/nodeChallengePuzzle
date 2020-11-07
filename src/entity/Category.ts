import {Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinTable} from "typeorm";
import Recipe from './Recipe';

@Entity()
export default class Category {

    @PrimaryGeneratedColumn() 
    id: number;

    @Column({unique: true})
    name: string;

    @OneToMany(type => Recipe, recipe => recipe.category)
    recipes: Recipe[];

};
