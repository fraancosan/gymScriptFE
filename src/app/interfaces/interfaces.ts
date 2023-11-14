export interface Product {
    id: number;
    nombre: string;
    descripcion: string;
    tipo: string;
}

export interface Usuarios {
  nombre: string;
  apellido: string;
  dni: number;
  telefono?: number;
  mail: string;
  contraseña: string;
}

export interface LoginRequest {
  mail: string;
  contraseña: string;
}

/*export type Roles = 'admin' | 'user';

export interface UserReponse {
    id: number;
    email: string;
    roles: Roles[];
}*/

export interface userLogin {
  id: number;
  nombre?: string;
  apellido?: string;
  email?: string;
  message?: string;
}

