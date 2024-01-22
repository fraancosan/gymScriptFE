export interface Product {
  id: number;
  nombre: string;
  descripcion: string;
  tipo: string;
}

export interface Usuarios {
  nombre: string;
  apellido: string;
  dni?: number;
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

// interface que se usa para identificar las tablas y sus campos - Se usa en el componente listados y en el servicio para identificar tablas
export interface esquemaTabla {
  key: string; // Nombre de la clave del atributo tal cual esta en la BD
  nombre: string; // Nombre del atributo como se va a mostrar en la tabla - Ej: Si la key es "img", el nombre sera "Imagen"
  campo: string; // Como se va a mostrar en la tabla. Ej: input, select, etc
  tipo: string; // Tipo de dato a usar. Ej: number, text, etc
  editable: boolean; // Se podra editar el valor una vez asignado?
  posValores?: string[]; // se usa para los select
}
