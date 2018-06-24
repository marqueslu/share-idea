import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, XHRBackend, RequestOptions } from '@angular/http';
import { RouterModule } from '@angular/router';
import { rootRouterConfig } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from "@angular/common";


// bootstrap
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { EditorModule } from '@tinymce/tinymce-angular';

// shared components
import { AppComponent } from './app.component';
import { MenuSuperiorComponent } from './shared/menu-superior/menu-superior.component';
import { FooterComponent } from './shared/footer/footer.component';
import { rootRoute } from '@angular/router/src/router_module';

// components 
import { HomeComponent } from './home/home.component';
import { CadastroComponent } from './usuario/cadastro/cadastro.component';
import { MenuLoginComponent } from './shared/menu-login/menu-login.component';
import { LoginComponent } from './usuario/login/login.component';
import { AcessoNegadoComponent } from './usuario/acesso-negado/acesso-negado.component';
import { PostagemComponent } from './postagem/postagem.component';
import { PostagemEditarComponent } from './postagem/postagem-editar/postagem-editar.component';
import { PostagemCriarComponent } from './postagem/postagem-criar/postagem-criar.component';
import { PerfilComponent } from './perfil/perfil.component';
import { PostagemExcluirComponent } from './postagem/postagem-excluir/postagem-excluir.component';
import { FeedComponent } from './feed/feed.component';
import { SeguidoresComponent } from './seguidores/seguidores.component';
import { SolicitacaoComponent } from './solicitacao/solicitacao.component';
import { BuscaComponent } from './shared/busca/busca.component';
import { PerfilBuscarComponent } from './perfil/perfil-buscar/perfil-buscar.component';
import { PerfilEditarComponent } from './perfil/perfil-editar/perfil-editar.component';
import { ProjetoComponent } from './projeto/projeto.component';
import { CriarProjetoComponent } from './projeto/criar-projeto/criar-projeto.component';
import { ProjetoDetalhesComponent } from './projeto/projeto-detalhes/projeto-detalhes.component';
import { ProjetoEditarComponent } from './projeto/projeto-editar/projeto-editar.component';

// services
import { UsuarioService } from './usuario/service/usuario.service';
import { PostagemService } from './postagem/service/postagem.service';
import { AuthService } from './services/auth.service';
import { PerfilService } from './perfil/service/perfil.service';
import { SeguidoresService } from './seguidores/service/seguidores.service';
import { SolicitacaoService } from './solicitacao/service/solicitacao.service';
import { ProjetoService } from './projeto/service/projeto.service';
import { LoaderService } from './services/loader-service';

//FireBase
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';

//Toasty
import { ToastyModule } from 'ng2-toasty';

//ng-block-ui
import { BlockUIModule } from 'ng-block-ui';

//ng2-interceptors
import { InterceptorService } from 'ng2-interceptors';

import { ServerUrlInterceptor } from './services/server-url-interceptor.service';
import { MensagemFactory } from './utils/mensagem-factory';

import { BootstrapModalModule } from 'ng2-bootstrap-modal';

import { NguiTabModule } from '@ngui/tab';

export function interceptorFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions, serverUrlInterceptor: ServerUrlInterceptor) {
  let service = new InterceptorService(xhrBackend, requestOptions);
  service.addInterceptor(serverUrlInterceptor);
  return service;
}

@NgModule({
  declarations: [
    AppComponent,
    MenuSuperiorComponent,
    FooterComponent,
    HomeComponent,
    CadastroComponent,
    MenuLoginComponent,
    LoginComponent,
    PerfilComponent,
    FeedComponent,
    AcessoNegadoComponent,
    PostagemComponent,
    PostagemEditarComponent,
    PostagemCriarComponent,
    PostagemExcluirComponent,
    SeguidoresComponent,
    SolicitacaoComponent,
    BuscaComponent,
    PerfilBuscarComponent,
    PerfilEditarComponent,
    ProjetoComponent,
    CriarProjetoComponent,
    ProjetoDetalhesComponent,
    ProjetoEditarComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    CommonModule,
    BootstrapModalModule.forRoot({ container: document.body }),
    CollapseModule.forRoot(),
    EditorModule,
    AngularFireModule,
    BootstrapModalModule,
    AngularFireDatabaseModule,
    ToastyModule.forRoot(),
    RouterModule.forRoot(rootRouterConfig, { useHash: false }),
    BlockUIModule.forRoot(),
    HttpModule,
    BrowserAnimationsModule, 
    NguiTabModule
  ],
  providers: [
    UsuarioService,
    PostagemService,
    AuthService,
    PerfilService,
    SeguidoresService,
    SolicitacaoService,
    ProjetoService,
    ServerUrlInterceptor,
    MensagemFactory,
    LoaderService,
    {
      provide: InterceptorService,
      useFactory: interceptorFactory,
      deps: [XHRBackend, RequestOptions, ServerUrlInterceptor]
    }

  ],
  bootstrap: [AppComponent],

})
export class AppModule {
}
