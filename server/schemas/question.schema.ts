import { Field, InputType, ObjectType } from "type-graphql";

@ObjectType()
export class QuestionResponse {
  @Field(() => String)
  status: string;

}
@InputType()
export class questionInput {
    @Field(() => String)
    data: string;
  
  }