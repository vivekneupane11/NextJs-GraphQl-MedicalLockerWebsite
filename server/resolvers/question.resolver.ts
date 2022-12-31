import { Arg, Args, Ctx, Field, Mutation, ObjectType, Query, Resolver } from 'type-graphql';
import { Departmentfilter, DepartmentInput, DepartmentListResponse, DepartmentResponse } from '../schemas/department.schema';
import ServicesService from '../services/services.service';
import departmentService from '../services/department.service';

import type { Context } from '../types/context';
import DepartmentService from '../services/department.service';
import QuestionService from '../services/question.service';
import { any, ZodAny } from 'zod';
import { questionInput, QuestionResponse } from '../schemas/question.schema';



@Resolver()
export default class QuestionResolver {
  constructor(private questionService: QuestionService) {
    this.questionService = new QuestionService();
  }

  @Mutation(()=> QuestionResponse)
  async createQuestion(@Arg('input') input: questionInput, @Ctx() ctx: Context) {
    console.log(input , "here questions")

 return this.questionService.createQuestion(input,ctx)
  }

}
