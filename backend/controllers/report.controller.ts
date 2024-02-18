import { Request, Response } from 'express'

import * as reportData from './../data/report.data';


const createReport = async (req: Request, res: Response): Promise<void> => {

  try {

    const data = req.body;

    await reportData.createReport(data);

    console.log('Report created');
    res.status(200).send({ message: 'Report created' });

  }
  catch (error: any) {

    console.log('Error while creating report: ' + (error as Error).message);
    res.status(400).send({ message: 'Error while creating report' });

  }

}

const getRecipes = async (req: Request, res: Response): Promise<void> => {

  try {

    const userId: string = req.body.userId;

    const data = await reportData.getRecipes(userId);

    console.log('Reported recipes retrieved');
    res.status(200).send(data);

  }
  catch (error: any) {

    console.log('Error while getting reported recipes: ' + (error as Error).message);
    res.status(400).send({ message: 'Error while getting reported recipes' });

  }

}

const getUsers = async (req: Request, res: Response): Promise<void> => {

  try {

    const userId: string = req.body.userId;

    const data = await reportData.getUsers();

    console.log('Reported users retrieved');
    res.status(200).send(data);

  }
  catch (error: any) {

    console.log('Error while getting reported users: ' + (error as Error).message);
    res.status(400).send({ message: 'Error while getting reported users' });

  }

}

const dismissReport = async (req: Request, res: Response): Promise<void> => {

  try {

    const reportId: string = req.body.reportId;

    await reportData.dismissReport(reportId);

    console.log('Report dismissed');
    res.status(200).send({ message: 'Report dismissed' });

  }
  catch (error: any) {

    console.log('Error while dismissing report: ' + (error as Error).message);
    res.status(400).send({ message: 'Error while dismissing report' });

  }

}


export {
  createReport,
  getRecipes,
  getUsers,
  dismissReport
}
