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


  
  export class Question {
    readonly _id: string;
  
    @prop({ required: true })
    question: string;
  

  
  }
  
  const QuestionModal = getModelForClass<typeof Question>(Question);
  export default QuestionModal;
  