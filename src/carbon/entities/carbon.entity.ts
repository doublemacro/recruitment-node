import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CARBONSTATUS } from "./carbon_status.enum";

@Entity()
export class Carbon {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    country: string;

    @Column()
    status: string;

    @ManyToOne(() => User, user => user.carbonCertificates)
    user: User;
}
