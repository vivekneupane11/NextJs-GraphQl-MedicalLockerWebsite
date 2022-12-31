import { Field, InputType, ObjectType } from "type-graphql";

@InputType()
export class DepartmentInput {
  @Field(() => String)
  departmentName: string;

  @Field(() => String)
  admin: string;
}

@ObjectType()
export class Department {
  @Field(() => String)
  readonly _id: string;

  @Field(() => String)
  departmentName: string;

  @Field(() => String)
  admin: string;
}

@ObjectType()
export class DepartmentResponse {
  @Field(() => String)
  status: string;
  @Field(() => Department)
  department: Department;
}

@ObjectType()
export class DepartmentListResponse {
  @Field(() => String)
  status: string;

  @Field(() => Number)
  results: number;

  @Field(() => [Department])
  departments: Department[];
}
@InputType()
export class Departmentfilter {
  @Field(() => Number, { nullable: true, defaultValue: 1 })
  page: number;

  @Field(() => Number, { nullable: true, defaultValue: 50 })
  limit: number;
}
