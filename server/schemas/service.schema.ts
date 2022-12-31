import { MinLength } from "class-validator";
import { Field, InputType, ObjectType } from "type-graphql";
import { UserData } from "./user.schema";

@InputType()
export class UpdateServiceInput {
  @Field(() => String, { nullable: true })
  assignedTo: string;

  @Field(() => String, { nullable: true })
  assignedAt: string;

  @Field(() => [Boolean], { nullable: true })
  dailyTap: boolean[];

  @Field(() => [Boolean], { nullable: true })
  monthlyTap: boolean[];

  @Field(() => [String], { nullable: true })
  monthlyTapDoneAt: string[];

  @Field(() => [String], { nullable: true })
  dailyTapDoneAt: string[];
}

@InputType()
export class Equipment {
  @Field(() => String)
  name: string;

  @Field(() => String)
  expiryDate: string;
  @Field(() => String)
  qty: string;
}

@InputType()
export class ServiceInput {
  @Field(() => String)
  serviceName: string;
  @Field(() => String)
  admin: string;
  @Field(() => String, { nullable: true })
  assignedTo: string;

  @Field(() => [Boolean], { nullable: true })
  dailyTap: boolean[];

  @Field(() => [Boolean], { nullable: true })
  monthlyTap: boolean[];
  @Field(() => [String], { nullable: true })
  monthlyTapDoneAt: string[];

  @Field(() => [String], { nullable: true })
  dailyTapDoneAt: string[];

  @Field(() => [Equipment])
  trolleyOne: Equipment[];
  @Field(() => [Equipment])
  trolleyTwo: Equipment[];
  @Field(() => [Equipment])
  trolleyThree: Equipment[];
  @Field(() => [Equipment])
  trolleyFour: Equipment[];

  @Field(() => String, { nullable: true })
  assignedAt: string;

  @Field(() => String, { nullable: true })
  image: string;
}


@InputType()
export class ServiceUpdateTrolleyInput {
  @Field(() => String)
  readonly _id: string;
  @Field(() => String)
  serviceName: string;
  @Field(() => String)
  admin: string;
  @Field(() => String, { nullable: true })
  assignedTo: string;

  @Field(() => [Boolean], { nullable: true })
  dailyTap: boolean[];

  @Field(() => [Boolean], { nullable: true })
  monthlyTap: boolean[];
  @Field(() => [String], { nullable: true })
  monthlyTapDoneAt: string[];

  @Field(() => [String], { nullable: true })
  dailyTapDoneAt: string[];

  @Field(() => [Equipment])
  trolleyOne: Equipment[];
  @Field(() => [Equipment])
  trolleyTwo: Equipment[];
  @Field(() => [Equipment])
  trolleyThree: Equipment[];
  @Field(() => [Equipment])
  trolleyFour: Equipment[];

  @Field(() => String, { nullable: true })
  assignedAt: string;

  @Field(() => String, { nullable: true })
  image: string;
}

@InputType()
export class ServiceFilter {
  @Field(() => Number, { nullable: true, defaultValue: 1 })
  page: number;

  @Field(() => Number, { nullable: true, defaultValue: 50 })
  limit: number;
}
@ObjectType()
export class EquipmentData {
  @Field(() => String)
  name: string;

  @Field(() => String)
  expiryDate: string;
  @Field(() => String)
  qty: string;
}

@ObjectType()
export class ServiceDataObj {
  @Field(() => String)
  readonly _id: string;

  @Field(() => String)
  serviceName: string;

  @Field(() => String)
  admin: string;

  @Field(() => String)
  assignedTo: string;

  @Field(() => String, { nullable: true })
  assignedAt: string;

  @Field(() => [Boolean])
  dailyTap: boolean[];

  @Field(() => String)
  image: string;

  @Field(() => [Boolean])
  monthlyTap: boolean[];
  @Field(() => [String], { nullable: true })
  monthlyTapDoneAt: string[];

  @Field(() => [String], { nullable: true })
  dailyTapDoneAt: string[];

  @Field(() => [EquipmentData])
  trolleyOne: EquipmentData[];
  @Field(() => [EquipmentData])
  trolleyTwo: EquipmentData[];
  @Field(() => [EquipmentData])
  trolleyThree: EquipmentData[];
  @Field(() => [EquipmentData])
  trolleyFour: EquipmentData[];
}

@ObjectType()
export class ServiceData extends ServiceDataObj {
  @Field(() => String)
  readonly _id: string;
  @Field(() => String)
  serviceName: string;
  @Field(() => String)
  admin: string;
  @Field(() => String)
  image: string;
  @Field(() => String)
  assignedTo: string;
  @Field(() => String, { nullable: true })
  assignedAt: string;
  @Field(() => [EquipmentData])
  trolleyOne: EquipmentData[];
  @Field(() => [EquipmentData])
  trolleyTwo: EquipmentData[];
  @Field(() => [EquipmentData])
  trolleyThree: EquipmentData[];
  @Field(() => [EquipmentData])
  trolleyFour: EquipmentData[];
}
@ObjectType()
export class ServicePopulatedData extends ServiceDataObj {
  @Field(() => ServiceData)
  service: ServiceData;
}

@ObjectType()
export class ServiceResponse {
  @Field(() => String)
  status: string;

  @Field(() => ServiceData)
  service: ServiceData;
}

@ObjectType()
export class ServicePopulatedResponse {
  @Field(() => String)
  status: string;

  @Field(() => ServicePopulatedData)
  service: ServicePopulatedData;
}

@ObjectType()
export class ServiceListResponse {
  @Field(() => String)
  status: string;

  @Field(() => Number)
  results: number;

  @Field(() => [ServicePopulatedData])
  services: ServicePopulatedData[];
}
