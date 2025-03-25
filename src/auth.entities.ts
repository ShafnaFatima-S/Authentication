import {Column, CreateDateColumn, Entity, PrimaryColumn} from 'typeorm';
@Entity('auth_app')
export class AuthApp{
    @PrimaryColumn()
    id: string;
    @Column()
    username: string;
    @Column()
    password:string;
    @Column('boolean',{default:false})
    delete:boolean;
    @Column({name:"deletedAt",nullable:true})
    deletedAt:Date;
    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at: Date;
}