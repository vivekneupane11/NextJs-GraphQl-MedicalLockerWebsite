import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import {
  LoginInput,
  LoginResponse,
  SignUpInput,
  UpdateCaregiverInput,
  UserData,
  UserResponse,
  UsersResponse,
} from '../schemas/user.schema';
import UserService from '../services/user.service';
import type { Context } from '../types/context';

@Resolver()
export default class UserResolver {
  constructor(private userService: UserService) {
    this.userService = new UserService();
  }

  @Mutation(() => UserResponse)
  async signupUser(@Arg('input') input: SignUpInput) {
    return this.userService.signUpUser(input);
  }
  @Mutation(() => UserResponse)
  async UpdateCaregiver(@Arg('input') input: UpdateCaregiverInput) {
    return this.userService.UpdateCaregiver(input);
  }
  @Mutation(() => UserResponse)
  async UpdateUser(@Arg('input') input: SignUpInput) {
    return this.userService.UpdateUser(input);
  }

  @Mutation(() => LoginResponse)
  async loginUser(@Arg('input') loginInput: LoginInput, @Ctx() ctx: Context) {
    console.log(loginInput);
    
    return this.userService.loginUser(loginInput, ctx);
  }

  @Query(() => UserResponse)
  async getMe(@Ctx() ctx: Context) {
    return this.userService.getMe(ctx);
  }

  @Query(() => UsersResponse)
  async getCaregivers() {
    return this.userService.getCaregivers();
  }


  @Query(() => UserResponse)
  async getCaregiver(@Arg('id') id: string, @Ctx() ctx: Context) {
    return this.userService.getCaregiver(id, ctx);
  }


  @Query(() => LoginResponse)
  async refreshAccessToken(@Ctx() ctx: Context) {
    return this.userService.refreshAccessToken(ctx);
  }

  @Query(() => Boolean)
  async logoutUser(@Ctx() ctx: Context) {
    return this.userService.logoutUser(ctx);
  }
}
