import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RefundPageComponent } from './pages/refundPage/refund-page/refund-page.component';
import { HomePageComponent } from './pages/homePage/home-page/home-page.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormComponent } from './components/refundComponents/form/form.component';
import { HomeComponent } from './components/homeComponents/home/home.component';
import { TableComponent } from './components/refundComponents/table/table.component';

@NgModule({
  declarations: [
    AppComponent,
    RefundPageComponent,
    HomePageComponent,
    FormComponent,
    HomeComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
