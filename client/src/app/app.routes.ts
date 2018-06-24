import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { CadastroComponent } from './usuario/cadastro/cadastro.component';
import { MenuLoginComponent } from './shared/menu-login/menu-login.component';
import { LoginComponent } from './usuario/login/login.component';
import { PerfilComponent } from './perfil/perfil.component';
import { FeedComponent } from './feed/feed.component';
import { AuthService } from './services/auth.service';
import { AcessoNegadoComponent } from './usuario/acesso-negado/acesso-negado.component';
import { PostagemEditarComponent } from './postagem/postagem-editar/postagem-editar.component';
import { PostagemComponent } from './postagem/postagem.component';
import { SolicitacaoComponent } from './solicitacao/solicitacao.component';
import { BuscaComponent } from './shared/busca/busca.component';
import { PerfilBuscarComponent } from './perfil/perfil-buscar/perfil-buscar.component';
import { PerfilEditarComponent } from './perfil/perfil-editar/perfil-editar.component';
import { ProjetoComponent } from './projeto/projeto.component';
import { CriarProjetoComponent } from './projeto/criar-projeto/criar-projeto.component';
import { ProjetoDetalhesComponent } from './projeto/projeto-detalhes/projeto-detalhes.component';
import { ProjetoEditarComponent } from './projeto/projeto-editar/projeto-editar.component';
import { SeguidoresComponent } from './seguidores/seguidores.component';

export const rootRouterConfig: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'cadastro', component: CadastroComponent },
    { path: 'acesso-negado', component: AcessoNegadoComponent },
    { path: 'login', component: LoginComponent },
    { path: 'perfil', canActivate: [AuthService], data: [{ claim: { nome: 'Usuario', valor: 'comum' } }], component: PerfilComponent },
    { path: 'perfil/:id', canActivate: [AuthService], data: [{ claim: { nome: 'Usuario', valor: 'comum' } }], component: PerfilComponent },
    { path: 'perfil-editar/:id', canActivate: [AuthService], data: [{ claim: { nome: 'Usuario', valor: 'comum' } }], component: PerfilEditarComponent },
    { path: 'feed', canActivate: [AuthService], data: [{ claim: { nome: 'Usuario', valor: 'comum' } }], component: FeedComponent },
    { path: 'postagem-editar/:id', canActivate: [AuthService], data: [{ claim: { nome: 'Usuario', valor: 'comum' } }], component: PostagemEditarComponent },
    { path: 'seguidores', canActivate: [AuthService], data: [{ claim: { nome: 'Usuario', valor: 'comum' } }], component: SeguidoresComponent },
    { path: 'solicitacoes', canActivate: [AuthService], data: [{ claim: { nome: 'Usuario', valor: 'comum' } }], component: SolicitacaoComponent },
    { path: 'buscar/:nome', canActivate: [AuthService], data: [{ claim: { nome: 'Usuario', valor: 'comum' } }], component: PerfilBuscarComponent },
    { path: 'projetos/:id', canActivate: [AuthService], data: [{ claim: { nome: 'Usuario', valor: 'comum' } }], component: ProjetoComponent },
    { path: 'projeto-detalhes/:id', canActivate: [AuthService], data: [{ claim: { nome: 'Usuario', valor: 'comum' } }], component: ProjetoDetalhesComponent },
    { path: 'projeto-criar', canActivate: [AuthService], data: [{ claim: { nome: 'Usuario', valor: 'comum' } }], component: CriarProjetoComponent },
    { path: 'projeto-editar/:id', canActivate: [AuthService], data: [{ claim: { nome: 'Usuario', valor: 'comum' } }], component: ProjetoEditarComponent }
]