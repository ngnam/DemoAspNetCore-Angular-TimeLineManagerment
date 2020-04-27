import {
  NgModule,
  Optional,
  SkipSelf,
  ErrorHandler
} from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ErrorHandlerInterceptor } from './intercepters/http-error.intercepter';
import { HttpApiService } from './services/http-api.service';
import { GlobalErrorComponent } from './exceptions/global-error.component';
import { GlobalErrorHandlerService } from './exceptions/global-error-handler.service';

@NgModule({
  imports: [HttpClientModule, RouterModule],
  providers: [
    HttpApiService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true
    },
    GlobalErrorHandlerService,
    { provide: ErrorHandler, useClass: GlobalErrorHandlerService }
  ],
  declarations: [
    GlobalErrorComponent,
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    // Import into AppModule
    if (parentModule) {
      throw new Error(
        `${parentModule} has already been loaded. Import Core module in the AppModule only.`
      );
    }
  }
}
