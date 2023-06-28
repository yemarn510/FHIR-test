import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, Unique } from "typeorm";
import { ResourceType } from "./resource.entity";

export enum TokenType {
  Identifier = 'identifier',
}


@Entity('TokenSearch')
export class TokenSearch {
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
    enum: TokenType,
    default: TokenType.Identifier,
  })
  parameter: TokenType;

  @Column()
  system: string;

  @Column()
  code: string;
}

