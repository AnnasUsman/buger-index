import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';

@Entity()
export class Restaurant {
  @PrimaryColumn()
  placeID: string;

  @Column()
  storeID: string;

  @Column()
  StoreName: string;
}