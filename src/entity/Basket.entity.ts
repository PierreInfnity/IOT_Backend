import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, Relation } from "typeorm"
import { Cart } from "./Cart.entity"
import { User } from "./User.entity"

@Entity()
export class Basket {
    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => User)
    @JoinColumn()
    user: User

    @OneToOne(() => Cart, (cart) => cart.basket)
    @JoinColumn()
    cart: Relation<Cart>
}