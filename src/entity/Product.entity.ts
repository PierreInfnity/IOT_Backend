import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, Relation } from "typeorm"

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: string

    @Column()
    name: string

    @Column()
    description: string

    @Column()
    weight: number

    @Column({default:0})
    price: number

    @Column('longtext')
    image: Buffer

}