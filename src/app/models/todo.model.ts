

export  interface Status  {
  id:number
  name:string
}

export interface  Todo {
  id:number;
  title :string;
  description :string;
  status?:Status,
}
