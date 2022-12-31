import { ValidationError } from 'apollo-server-core';
import errorHandler from '../controllers/error.controller';
import {  ServiceFilter, ServiceInput, ServiceUpdateTrolleyInput } from '../schemas/service.schema';
import ServiceModal from '../models/services.modal';
import { Context } from '../types/context';

export default class ServicesService {
  async createService(input: Partial<ServiceInput>, { req, res }: Context) {
    try {
      console.log(input , 'second here')
      const service = await ServiceModal.create({ ...input });
      return {
        status: 'success',
        service: {
          ...service.toJSON(),
          id: service?._id,
        },
      };
    } catch (error: any) {
      console.log(error,'here2')
      if (error.code === 11000)
        throw new ValidationError('Service with that title already exist');
      errorHandler(error);
    }
  }
  async updateTrolley(input: Partial<ServiceUpdateTrolleyInput>, { req, res }: Context) {
    try {



      const service = await ServiceModal.findByIdAndUpdate(
        input._id,
        { ...input },
        {
          new: true,
          runValidators: true,
          lean: true,
        }
      );
      return {
        status: 'success',
        service: {
          ...service,
          id: service?._id,
        },
      };
    } catch (error: any) {
      console.log(error,'here2')
      if (error.code === 11000)
        throw new ValidationError('Service with that title already exist');
      errorHandler(error);
    }
  }

  async getService(id: string, { req, res }: Context) {
    try {
      // const post = await ServiceModal.findById(id).populate('user').lean();
      const service = await ServiceModal.findById(id)
      if (!service) return new ValidationError('No post with that id exists');

      return {
        status: 'success',
        service,
      };
    } catch (error: any) {
      errorHandler(error);
    }
  }
  async getServicebyAdmin(email: string, { req, res }: Context) {
    try {
      // const post = await ServiceModal.findById(id).populate('user').lean();
      const services = await ServiceModal.find({admin:email})
      if (!services) return new ValidationError('No post with that id exists');

      return {
        status: 'success',
        services,
      };
    } catch (error: any) {
      errorHandler(error);
    }
  }

  async updateService(
    id: string,
    input: Partial<ServiceInput>,
    { req, res }: Context
  ) {
    try {
      const service = await ServiceModal.findByIdAndUpdate(
        id,
        { ...input },
      );
      if (!service) return new ValidationError('No service with that id exists');
      return {
        status: 'success',
        service: {
          ...service,
          id: service?._id,
        },
      };
    } catch (error: any) {
      errorHandler(error);
    }
  }

  async getServices(input: ServiceFilter, { req, res }: Context) {
    try {
      const servicesQuery = ServiceModal.find({ });

      // Pagination
      const page = input.page || 1;
      const limit = input.limit || 10;
      const skip = (page - 1) * limit;

      const services = await servicesQuery
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean();
      return {
        status: 'success',
        results: services.length,
        services,
      };
    } catch (error: any) {
      errorHandler(error);
    }
  }

  async deleteService(id: string, { req, res }: Context) {
    try {
      const service = await ServiceModal.findByIdAndDelete(id);

      if (!service) return new ValidationError('No service with that id exists');

      return true;
    } catch (error: any) {
      errorHandler(error);
    }
  }
}
