import { Arg, Args, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { Departmentfilter, DepartmentInput, DepartmentListResponse, DepartmentResponse } from '../schemas/department.schema';
import ServicesService from '../services/services.service';
import departmentService from '../services/department.service';

import type { Context } from '../types/context';
import DepartmentService from '../services/department.service';

@Resolver()
export default class DepartmentResolver {
  constructor(private departmentService: departmentService) {
    this.departmentService = new DepartmentService();
  }

  @Mutation(() => DepartmentResponse)
  async createDepartment(@Arg('input') input: DepartmentInput, @Ctx() ctx: Context) {
    console.log(input , "here")
    return this.departmentService.createDepartment(input,ctx)
  }

  @Query(() => DepartmentResponse)
  async getDepartmentByAdmin(@Arg('email') email: string, @Ctx() ctx: Context) {
    return this.departmentService.getDepartmentByAdmin(email, ctx);
  }



  @Query(() => DepartmentListResponse)
  async getDepartments(
    @Arg('input', { nullable: true }) input: Departmentfilter,
    @Ctx() ctx: Context
  ) {
    console.log(input)
    return this.departmentService.getDepartments(input, ctx);
  }

  @Mutation(() => Boolean)
  async deleteDepartment(@Arg('id') id: string, @Ctx() ctx: Context) {
    return this.departmentService.deleteDepartment(id, ctx);
  }
}
