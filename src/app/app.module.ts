import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
// import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
// import { getAuth, provideAuth } from '@angular/fire/auth';
// import { getFirestore, provideFirestore } from '@angular/fire/firestore';
// import { getStorage, provideStorage } from '@angular/fire/storage';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp({"projectId":"fir-demo-app-ac7da","appId":"1:446747679428:web:18d5c29a2831e3cb6d8791","storageBucket":"fir-demo-app-ac7da.appspot.com","apiKey":"AIzaSyAJLPPaRiBQAfnw0q0KNkfgpXlyf4_anEA","authDomain":"fir-demo-app-ac7da.firebaseapp.com","messagingSenderId":"446747679428","measurementId":"G-VRGG468HMJ"}),
    FormsModule,
  ],
  providers: [
    // provideFirebaseApp(() => initializeApp({"projectId":"fir-demo-app-ac7da","appId":"1:446747679428:web:18d5c29a2831e3cb6d8791","storageBucket":"fir-demo-app-ac7da.appspot.com","apiKey":"AIzaSyAJLPPaRiBQAfnw0q0KNkfgpXlyf4_anEA","authDomain":"fir-demo-app-ac7da.firebaseapp.com","messagingSenderId":"446747679428","measurementId":"G-VRGG468HMJ"})),
    // provideAuth(() => getAuth()),
    // provideFirestore(() => getFirestore()),
    // provideStorage(() => getStorage())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
