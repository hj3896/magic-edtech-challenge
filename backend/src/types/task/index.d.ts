export type Task = {
  name: string;
  due: Date;
  complete: boolean;
  description: string;
  created_by: Schema.Types.ObjectId;
  updated_by: Schema.Types.ObjectId;
  is_active: boolean;
};
