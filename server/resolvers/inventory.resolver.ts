import { Arg, Args, Ctx, Field, Mutation, ObjectType, Query, Resolver } from 'type-graphql';
import { Departmentfilter, DepartmentInput, DepartmentListResponse, DepartmentResponse } from '../schemas/department.schema';
import ServicesService from '../services/services.service';
import departmentService from '../services/department.service';

import type { Context } from '../types/context';
import DepartmentService from '../services/department.service';
import QuestionService from '../services/question.service';
import { any, ZodAny } from 'zod';
import { questionInput, QuestionResponse } from '../schemas/question.schema';
import { inventoryInput, InventoryResponse } from '../schemas/inventory.schema';
import InventoryService from '../services/inventory.service';



@Resolver()
export default class InventoryResolver {
  constructor(private inventoryService: InventoryService) {
    this.inventoryService = new InventoryService();
  }

  @Mutation(()=> InventoryResponse)
  async createInventory(@Arg('input') input: inventoryInput, @Ctx() ctx: Context) {
    console.log(input , "here inventory")

 return this.inventoryService.createInventory(input,ctx)
  }

}
