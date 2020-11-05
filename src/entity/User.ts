import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

export interface UserInt {
    id: number;
    name: string;
    email: string;
    password: string;
};

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

}

export type UserType = typeof User;
