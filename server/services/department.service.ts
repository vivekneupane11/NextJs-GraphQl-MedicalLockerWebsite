import { ValidationError } from 'apollo-server-core';
import errorHandler from '../controllers/error.controller';
import { Context } from '../types/context';
import { Departmentfilter, DepartmentInput } from '../schemas/department.schema';
import DepartmentModal from '../models/department.modal';
import UserModel from '../models/user.model';

export default class DepartmentService {
  async createDepartment(input: Partial<DepartmentInput>, { req, res }: Context) {
    try {
      console.log(input , 'second here')
      const department = await DepartmentModal.create({ ...input });
      const user = await UserModel.findOneAndUpdate({email:input.admin},{
        $set:{assignedDepartment:input.departmentName}
      })
      return {
        status: 'success',
        department: {
          ...department.toJSON(),
          id: department?._id,
        },
      };
    } catch (error: any) {
      console.log(error,'here2')
      if (error.code === 11000)
        throw new ValidationError('Department with that title already exist');
      errorHandler(error);
    }
  }

  async getDepartments(input: Departmentfilter, { req, res }: Context) {
    try {
      const departmentQuery = DepartmentModal.find({ });

      // Pagination
      const page = input.page || 1;
      const limit = input.limit || 10;
      const skip = (page - 1) * limit;

      const departments = await departmentQuery
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean();
      return {
        status: 'success',
        results: departments.length,
        departments,
      };
    } catch (error: any) {
      errorHandler(error);
    }
  }


  async getDepartmentByAdmin(email: string, { req, res }: Context) {
    try {
      // const post = await ServiceModal.findById(id).populate('user').lean();
      const department = await DepartmentModal.findOne({admin:email})

      console.log("i am hre",department)
      if (!department) return new ValidationError('No department assigned by this admin');

      return {
        status: 'success',
        department,
      };
    } catch (error: any) {
      errorHandler(error);
    }
  }


  async deleteDepartment(id: string, { req, res }: Context) {
    try {
      const department = await DepartmentModal.findByIdAndDelete(id);

      if (!department) return new ValidationError('No department with that id exists');

      return true;
    } catch (error: any) {
      errorHandler(error);
    }
  }
}
