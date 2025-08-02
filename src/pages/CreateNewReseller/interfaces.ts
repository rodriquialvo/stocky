import { Customer } from '../../services/users/dtos/generic';

export interface CreateNewResellerController {
  /* State */
  formValues: {
    name: string;
    lastname: string;
    email: string;
    phone: string;
    roles: string[];
    address: string;
    active: boolean;
    birthdate: Date;
    dni: string;
  };
  loading: boolean;
  texts: {
    title: string;
    button: string;
  };
  roles: any[];

  /* Events */
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleDateChange: (date: Date) => void;
}

export interface CreateNewResellerProps {
  useController?: () => CreateNewResellerController;
}
