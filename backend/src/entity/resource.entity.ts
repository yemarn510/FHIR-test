import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, Unique } from "typeorm";

export enum ResourceType {
  Patient = 'Patient',
  Practitioner = 'Practitioner',
  Organization = 'Organization',
}


@Entity('Resource')
export class Resource {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: ResourceType,
    default: ResourceType.Patient,
  })
  type: ResourceType;

  @Column()
  version: number;

  @Column()
  alive: boolean;

  @Column({
    type: 'text',
    unique: true,
  })
  raw: string;
}

