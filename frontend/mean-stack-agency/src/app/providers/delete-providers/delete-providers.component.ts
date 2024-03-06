import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProviderClass } from 'src/app/models/providers.class';
import { ProviderService } from 'src/app/services/provider.service';

@Component({
  selector: 'app-delete-providers',
  templateUrl: './delete-providers.component.html',
  styleUrls: ['./delete-providers.component.css']
})
export class DeleteProvidersComponent implements OnInit {
  id?:string;
  ready:boolean=false;
  submitted:boolean=false;
  submissionError:boolean = false;
  errorMessage:string="";
  isDeleted:boolean = false;
  company:string='';
  constructor(private providerService : ProviderService, private route:ActivatedRoute){

  }
  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next:(param)=>{
        if(param){
          this.id = param.get('id')?.toString();
        }
      },
      error:(error)=>{console.log(error)}
    });

    this.deleteProvider(this.id);
  }

  deleteProvider(id:string|undefined){
    if(id){
      console.log(id)
      this.providerService.deleteProvider(id).subscribe({
        next:(result)=>{
          if(result){
            let data = result.data;
            console.log(data)
            this.company=data.company.company_name
            //this.provider=this.buildProvider(data);
            //ompany=this.provider?.company.company_name;
              this.isDeleted=true;
              this.ready=true;
              this.submitted=true;
            // if(this.provider){
            //   this.submitted=true;
            // }else{
            //   this.submitted=false;
            //   this.ready=false;
            // }

            console.log(result)
          }
        },
        error:(error)=>{
          this.submissionError=true;
          this.errorMessage = "Sorry something went wrong. Try again later"
          console.log(error)
        }
      })
    }
  }

  // buildProvider(data:any):ProviderClass{
  //   let deletedProvider = new ProviderClass();
  //   if(data){
  //     deletedProvider._id=data._id;
  //     deletedProvider.firstname=data.firstname;
  //     deletedProvider.lastname=data.lastname;
  //     deletedProvider.position=data.position;
  //     deletedProvider.company={
  //     company_name:data.company.company_name,
  //     address:data.company.address,
  //     address2:data.company.address2,
  //     city:data.company.city,
  //     state:data.company.state,
  //     postal_code:data.company.postal_code,
  //     email:data.company.email,
  //     phone:data.company.phone,
  //     description:data.company.description,
  //     tagline:data.company.tagline
  //     }

  //   }
  //   return deletedProvider._id==parseInt(data._id)?deletedProvider:new ProviderClass()
  // }

}
