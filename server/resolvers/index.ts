import UserResolver from './user.resolver';
import ServiceResolver from './service.resolver'
import DepartmentResolver from './department.resolver';
import QuestionResolver from './question.resolver';
import InventoryResolver from './inventory.resolver';

export const resolvers = [UserResolver,ServiceResolver,DepartmentResolver,QuestionResolver,InventoryResolver] as const;
