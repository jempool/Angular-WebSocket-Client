import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ChatComponent } from './core/chat/chat.component';
// import { JwtInterceptorService } from './core/services/jwt-interceptor.service';
import { LoginComponent } from './core/account/login.component';
import { RegisterComponent } from './core/account/register.component';

const routes: Routes = [
  { path: 'chat', component: ChatComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), HttpClientModule],
  // providers: [
  //   {
  //     provide: HTTP_INTERCEPTORS,
  //     useClass: JwtInterceptorService,
  //     multi: true,
  //   },
  // ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
