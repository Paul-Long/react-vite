interface WorkerMsg<T = any> {
  type: string;
  data?: T;
  [index: string]: any;
}
