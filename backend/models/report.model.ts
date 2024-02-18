import { Model, Schema, model } from 'mongoose';

import { IReport } from './../interfaces/report.interface';


const ReportSchema: Schema<IReport> = new Schema<IReport>({

  userId: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  reportedId: {
    type: String,
    required: true
  },
  seen: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true
  }

});


const ReportModel: Model<IReport> = model('report', ReportSchema);

export default ReportModel;
