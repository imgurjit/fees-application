interface IFees {
  feeStructureName: string;
  frequency: string;
  installment: number;
  amount: number;
  registerFee: number;
  course: Array<string>;
  studentCount: number;
}

type FeesState = {
  fees: IFees[];
};

type FeesAction = {
  type: string;
  Ifees: IFees;
};

type DispatchType = (args: FeesAction) => FeesAction;
