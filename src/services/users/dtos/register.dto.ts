export interface ResponseRegisterDto {
    accessToken: string;
    basicToken:  string;
    user:        User;
}

export interface User {
    id:             string;
    name:           string;
    lastname:       string;
    email:          string;
    roles:          Role[];
    phone:          string;
    birthdate:      Date;
    address:        string;
    active:         boolean;
    lastConnection: null;
    dni:            string;
}

export interface Role {
    id:          string;
    name:        string;
    description: string;
}

export interface registerBody {
    name: string,
    lastname: string,
    password: string,
    email: string,
    birthdate: string,
    roles: string[],
    dni: string
}