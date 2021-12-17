import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Review {
  @PrimaryColumn()
  reviewID: string;

  @Column()
  storeID: string;

  @Column({
    length: 5000
  })
  review: string;

  @Column()
  reviewerName: string;

  @Column()
  date: string;
}