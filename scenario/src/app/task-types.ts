// No need to change this file
export type Task = {
  name: string,
  due: Date,
  complete: boolean,
  description: string,
}

export type TaskAndId = Task & { _id: string }
