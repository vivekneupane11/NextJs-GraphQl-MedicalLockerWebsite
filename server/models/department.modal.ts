import {
    getModelForClass,
    ModelOptions,
    prop,
    Severity,
  } from '@typegoose/typegoose';

  
  @ModelOptions({
    schemaOptions: {
      timestamps: true,
    },
    options: {
      allowMixed: Severity.ALLOW,
    },
  })


  
  export class Department {
    readonly _id: string;
  
    @prop({ required: true,unique: true, })
    departmentName: string;
  
    @prop({required:true })
    admin: string;
  
  }
  
  const DepartmentModal = getModelForClass<typeof Department>(Department);
  export default DepartmentModal;
  