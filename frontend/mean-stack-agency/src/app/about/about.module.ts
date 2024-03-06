import { NgModule } from "@angular/core";
import { AboutComponent } from "./about.component";
import { RouterModule } from "@angular/router";


@NgModule({
  declarations:[AboutComponent], //components, directives, pipes
  imports:[RouterModule],      //Other Modules or Feature Module
  exports:[AboutComponent],      //items from the declarations and imports
  providers:[]      //Services

})

export class AboutModule{

}
