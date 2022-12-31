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
  class Equipment{
    @prop({ required: true })
    name: string;

    @prop({ required: true })
    expiryDate: string;

    @prop({ required: true })
    qty: string;

  }

  
  export class Service {
    readonly _id: string;
  
    @prop({ required: true })
    serviceName: string;
    
    @prop({ required: true })
    admin:string;
  
    @prop({default:'' })
    assignedTo: string;

    @prop({ default: 'default.jpeg' })
    image: string;

  
    @prop()
    dailyTap: boolean[];

    @prop()
    monthlyTapDoneAt: string[];
    
    @prop()
    dailyTapDoneAt: string[];

    @prop()
    monthlyTap: boolean[];

    @prop({ default:'' })
    assignedAt: string;

    @prop({  })
    trolleyOne: Equipment[];
    @prop({  })
    trolleyTwo: Equipment[];
    @prop({  })
    trolleyThree: Equipment[];
    @prop({  })
    trolleyFour: Equipment[];
  
  }
  
  const ServiceModel = getModelForClass<typeof Service>(Service);
  export default ServiceModel;
  