export interface IStatus {
  code: number;
  error: string;
}

export class StatusBean implements IStatus {
  code = 0;
  error = ""
}