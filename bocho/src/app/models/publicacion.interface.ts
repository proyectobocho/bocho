export interface Publicacion {
    linkDoc: string;
    contenido: string;
    fecha: Date;
    privado?: boolean;
    user?: any;
    comentario?: any;
    id?: any;
    titulo: string;
    grupoId?:any;
}

//"linkDoc", "contenido", "fecha"