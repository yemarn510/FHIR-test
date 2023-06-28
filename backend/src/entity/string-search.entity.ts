import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, Unique } from "typeorm";
import { ResourceType } from "./resource.entity";
import { TokenType } from "./token-search.entity";

export enum StringType {
  Gender = 'Gender'
}


@Entity('StringSearch')
export class StringSearch {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: ResourceType,
    default: ResourceType.Patient,
  })
  type: ResourceType;

  @Column('uuid')
  typeID: string;

  @Column({
    type: 'enum',
    enum: StringType,
    default: StringType.Gender,
  })
  parameter: StringType;

  @Column()
  value: string;
}

