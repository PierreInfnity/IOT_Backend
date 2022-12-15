import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, JoinTable, Relation, ManyToMany, Column, ManyToOne } from "typeorm"
import { Basket } from "./Basket.entity"
import { BalanceStatus } from "./enum/BalanceStatus.enum"
import { Product } from "./Product.entity"

@Entity()
export class Balance {
    @PrimaryGeneratedColumn()
    id: string

    @ManyToOne(() => Product, {
        eager: true,
    })
    product: Product

    @ManyToOne(() => Basket, {
        eager: true,
    })
    basket: Basket


    @Column({ nullable: true })
    precedentWeight: number;

    @Column({ nullable: true })
    finalWeight: number;

    @Column({ nullable: true })
    updatedAt: Date;

    @Column({ default: BalanceStatus.PENDING })
    status: BalanceStatus;
}