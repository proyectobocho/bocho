export interface Publicacion{
    linkDoc:string;
    contenido: string;
    fecha:Date;
    privado?:boolean;
    user?:any
}

//"linkDoc", "contenido", "fecha"