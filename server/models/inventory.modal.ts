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


  
  export class Inventory {
    readonly _id: string;
  
    @prop({ required: true })
    inventory: string;
  

  
  }
  
  const InventoryModal = getModelForClass<typeof Inventory>(Inventory);
  export default InventoryModal;
  