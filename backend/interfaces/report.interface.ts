interface IReport {

  _id?: string;
  userId?: string;
  type: 'user' | 'recipe';
  reportedId: string;
  seen?: boolean;
  createdAt?: Date;

}


export { IReport }
