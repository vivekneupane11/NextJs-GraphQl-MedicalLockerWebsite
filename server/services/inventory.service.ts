import { ValidationError } from 'apollo-server-core';
import errorHandler from '../controllers/error.controller';
import { Context } from '../types/context';
import { Departmentfilter, DepartmentInput } from '../schemas/department.schema';
import DepartmentModal from '../models/department.modal';
import UserModel from '../models/user.model';
import QuestionModal from '../models/question.modal';
import { questionInput } from '../schemas/question.schema';
import { inventoryInput } from '../schemas/inventory.schema';
import InventoryModal from '../models/inventory.modal';

export default class InventoryService {
  async createInventory(input: inventoryInput, { req, res }: Context) {
    try {
      const question = await InventoryModal.create({ inventory:input.data });

      return {
        status: 'success',

      };
    } catch (error: any) {
      console.log(error,'here2')
      if (error.code === 11000)
        throw new ValidationError('Inventory with that title already exist');
      errorHandler(error);
    }
  }







}
