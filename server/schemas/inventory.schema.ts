import { Field, InputType, ObjectType } from "type-graphql";

@ObjectType()
export class InventoryResponse {
  @Field(() => String)
  status: string;

}
@InputType()
export class inventoryInput {
    @Field(() => String)
    data: string;
  
  }