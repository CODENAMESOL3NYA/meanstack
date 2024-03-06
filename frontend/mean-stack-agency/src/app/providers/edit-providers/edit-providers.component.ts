import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProviderClass } from 'src/app/models/providers.class';
import { ProviderService } from 'src/app/services/provider.service';

@Component({
  selector: 'app-edit-providers',
  templateUrl: './edit-providers.component.html',
  styleUrls: ['./edit-providers.component.css']
})
export class EditProvidersComponent implements OnInit{
  providersForm:FormGroup;
  provider:ProviderClass;
  submitted:boolean=false;
  param?:string;
  newProvider:ProviderClass;
  ready = false //load form only when data is present
  constructor(private providerService:ProviderService, private route:ActivatedRoute){
    this.route.paramMap.subscribe(
      {
      next: (p) => { this.param = p.get('id')?.toString() },
      error: (e) => { console.error(e) }
      }
    )
    this.getProviderById(this.param);

  }
  ngOnInit(): void {


  }
    //Form Controls get()
    get f() { return this.providersForm.controls; }
  //handleUpdate
  handleUpdate(){
    this.ready=false;
    if(this.providersForm.valid){

      let {
        _id,
        firstname,
        lastname,
        position,
        company_name,
        address,
          address2,
          city,
          state,
          postal_code,
          email,
          phone,
          description,
          tagline

      } = this.providersForm.value;
      let newProvider = new ProviderClass();
      newProvider._id = _id;
      newProvider.firstname = firstname;
      newProvider.lastname = lastname;
      newProvider.position = position;
      newProvider.company = {
        company_name: company_name,
        address: address,
        address2: address2,
        city: city,
        state: state,
        postal_code: postal_code,
        phone: phone,
        email: email,
        description: description,
        tagline: tagline
      }
      if(this.param){
        this.updateProvider(this.param,newProvider);
        this.ready=true;
        this.submitted=false;
      }

    }
  }

  //Build form
  buildFormControls(data:ProviderClass){
    this.providersForm = new FormGroup({
      firstname: new FormControl("", [Validators.required, Validators.minLength(2), Validators.maxLength(25), Validators.pattern(/^[a-zA-Z]+$/)]),
      lastname: new FormControl("", [Validators.required, Validators.minLength(2), Validators.maxLength(25), Validators.pattern(/^[a-zA-Z]+$/)]),
      position: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email]),
      phone: new FormControl("", [Validators.required, Validators.minLength(10), Validators.pattern(/^\+?[0-9]{1,4}[0-9\-]+$/)]),
      company_name: new FormControl("", [Validators.required, Validators.minLength(3)]),
      address: new FormControl("", [Validators.required]),
      address2: new FormControl(""),
      city: new FormControl("", [Validators.required]),
      state: new FormControl("", [Validators.required, Validators.maxLength(2)]),
      postal_code: new FormControl("", [Validators.required, Validators.minLength(5), Validators.maxLength(5)]),
      description: new FormControl("", [Validators.required]),
      tagline: new FormControl("", [Validators.required]),
    })
    if(data){
      this.providersForm.patchValue({
        firstname:data.firstname,
        lastname:data.lastname,
        position:data.position,
        email:data.company.email,
        phone:data.company.phone,
        company_name:data.company.company_name,
        address:data.company.address,
        address2:data.company.address2,
        city:data.company.city,
        state:data.company.state,
        postal_code:data.company.postal_code,
        description:data.company.description,
        tagline:data.company.tagline,
      })
    }
  }
  //Get Provider  By Id
  getProviderById(id:string|undefined){
    if(id){
      this.providerService.getProviderById(id).subscribe({
        next:(v)=>{
          let data = v[0];
          this.provider = this.buildProvider(data);
          if(this.provider){
            this.buildFormControls(this.provider);
            setTimeout(()=>{
              this.ready=true;
            },500)
          }
        },
        error:(e)=>{console.error(e)}
      })
    }else{
      throw new Error('Id Not Found')
    }

  }

  //Update provider
  updateProvider(id:string,data:ProviderClass){
    this.providerService.updateProvider(id,data).subscribe(
      {
        next:(p)=>{
          let data = p;
          this.provider = this.buildProvider(data);
          if(this.provider){
            setTimeout(()=>{
              //this.ready=true;
              this.submitted=true;
            },500)
          }
          //this.submitted=false;
          //this.ready=true
          this.buildFormControls(this.provider);
        },
        error:(e)=>{console.log(e)},
      }
    )
  }

  //Build a Provider
  buildProvider(data:any){
    let provider = new ProviderClass();
    if (data) {
      let {
        _id,
        firstname,
        lastname,
        position,
        company: {
          company_name,
          address,
          address2,
          city,
          state,
          postal_code,
          email,
          phone,
          description,
          tagline
        }
      } = data;
      provider._id = _id;
      provider.firstname = firstname;
      provider.lastname = lastname;
      provider.position = position;
      provider.company = {
        company_name: company_name,
        address: address,
        address2: address2,
        city: city,
        state: state,
        postal_code: postal_code,
        phone: phone,
        email: email,
        description: description,
        tagline: tagline
      }
    }
    return provider
  }

}
