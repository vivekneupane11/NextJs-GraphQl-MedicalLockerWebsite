import { Arg, Args, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import {ServiceFilter, ServiceInput,ServiceListResponse,ServicePopulatedResponse,ServiceResponse, ServiceUpdateTrolleyInput, UpdateServiceInput} from '../schemas/service.schema'
import ServicesService from '../services/services.service';
import type { Context } from '../types/context';

@Resolver()
export default class ServiceResolver {
  constructor(private servicesService: ServicesService) {
    this.servicesService = new ServicesService();
  }

  @Mutation(() => ServiceResponse)
  async createService(@Arg('input') input: ServiceInput, @Ctx() ctx: Context) {
    console.log(input , "here")
    return this.servicesService.createService(input, ctx);
  }
  @Mutation(() => ServiceResponse)
  async updateTrolley(@Arg('input') input: ServiceUpdateTrolleyInput, @Ctx() ctx: Context) {
    console.log(input , "here")
    return this.servicesService.updateTrolley(input, ctx);
  }

  @Query(() => ServicePopulatedResponse)
  async getService(@Arg('id') id: string, @Ctx() ctx: Context) {
    return this.servicesService.getService(id, ctx);
  }
  @Query(() => ServiceListResponse)
  async getServicebyAdmin(@Arg('email') email: string, @Ctx() ctx: Context) {
    console.log("here");
    
    return this.servicesService.getServicebyAdmin(email, ctx);
  }
  
  @Mutation(() => ServiceResponse)
  async updateService(
    @Arg('id') id: string,
    @Arg('input') input: UpdateServiceInput,
    @Ctx() ctx: Context
  ) {
    console.log(id,input);
    
    return this.servicesService.updateService(id, input, ctx);
  }

  @Query(() => ServiceListResponse)
  async getServices(
    @Arg('input', { nullable: true }) input: ServiceFilter,
    @Ctx() ctx: Context
  ) {
    console.log(input)
    return this.servicesService.getServices(input, ctx);
  }

  @Mutation(() => Boolean)
  async deleteService(@Arg('id') id: string, @Ctx() ctx: Context) {
    return this.servicesService.deleteService(id, ctx);
  }
}
