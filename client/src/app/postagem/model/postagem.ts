import { Usuario } from "../../usuario/models/usuario";

export class Postagem {
    id: string;
    conteudo: string;
    usuarioId: string;
    curtidas: number;
    compartilhada: boolean;
    editado: boolean;
    dataPostagem: Date;
    usuario: Usuario;

    //Feed
    nome: string;
    sobrenome: string;
    sobre: string;
    profissao: string;
}