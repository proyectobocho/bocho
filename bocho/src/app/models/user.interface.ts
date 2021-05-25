export interface UserResponse {
    message: string;
    token: string;
    userId:number;
    user: {
        email: string,
        nombre: string,
        apellido: string
    };
}

export interface User {
    email: string;
    password: string;
}

export interface UserData {
    username:string;
    password:string;
    email:string;
    nacimiento:Date;
    grado:number;
}

export interface GradoEstudio{
    id: number;
    descripcion: string;
}