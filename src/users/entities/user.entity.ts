import { Carbon } from "src/carbon/entities/carbon.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;
    @Column()
    password: string;
    
    @OneToMany(() => Carbon, carbonCertificate => carbonCertificate.user)
    carbonCertificates: Carbon[];
}