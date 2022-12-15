import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Manager {
    @PrimaryGeneratedColumn()
    id: string

    @Column({ default: "" })
    mail: string

    @Column()
    password: string
}