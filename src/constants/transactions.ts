import {TransactionTypes} from '../services/transactions/dtos/transactions.dto';
import {ISearchHistory} from '../fragments/Transaction/TransactionsList/interfaces';

export const defaultSearchHistory: ISearchHistory[] = [
  {label: TransactionTypes.TRANSFER, isDefault: true},
  {label: TransactionTypes.WITHDRAW, isDefault: true},
  {label: TransactionTypes.SERVICES_PAY, isDefault: true},
  {label: TransactionTypes.INCOME, isDefault: true},
  {label: TransactionTypes.CHANGE, isDefault: true},
];
