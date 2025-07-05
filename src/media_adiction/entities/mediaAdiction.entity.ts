import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class MediaAdiction {
 @PrimaryGeneratedColumn()
  Student_ID: number;

  @Column()
  Age: number;

  @Column()
  Gender: string; // Considera usar un enum si solo es "Male"/"Female"

  @Column()
  Academic_Level: string; // Enum opcional: "High School", "Undergraduate", "Graduate"

  @Column()
  Country: string;

  @Column('float')
  Avg_Daily_Usage_Hours: number;

  @Column()
  Most_Used_Platform: string;

  @Column()
  Affects_Academic_Performance: string; // o boolean, si lo prefieres como true/false

  @Column('float')
  Sleep_Hours_Per_Night: number;

  @Column()
  Mental_Health_Score: number;

  @Column()
  Relationship_Status: string; // Enum opcional: "Single", "In Relationship", "Complicated"

  @Column()
  Conflicts_Over_Social_Media: number;

  @Column()
  Addicted_Score: number;
}
