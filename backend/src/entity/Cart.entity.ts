import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, Relation } from "typeorm"
import { Basket } from "./Basket.entity"

@Entity()
export class Cart {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    reserved: boolean

    @OneToOne(() => Basket, (basket) => basket.cart)
    @JoinColumn()
    basket: Relation<Basket>
}