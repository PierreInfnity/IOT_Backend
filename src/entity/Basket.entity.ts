import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, JoinTable, Relation, ManyToMany, Column, ManyToOne } from "typeorm"
import { Cart } from "./Cart.entity"
import { Product } from "./Product.entity"
import { User } from "./User.entity"

@Entity()
export class Basket {
    @PrimaryGeneratedColumn()
    id: string

    @ManyToOne(() => User, {
        eager: true,
    })
    user: User

    @OneToOne(() => Cart, (cart) => cart.basket, {
        eager: true,
    })
    @JoinColumn()
    cart: Relation<Cart>

    @Column({ default: false })
    active: boolean;

    @Column({ nullable: true })
    paidAt: Date;

    @Column({ nullable: true })
    paid: number;

    @ManyToMany(() => Product, {
        eager: true,
        onDelete: 'CASCADE',
    })
    @JoinTable()
    products: Product[];
}