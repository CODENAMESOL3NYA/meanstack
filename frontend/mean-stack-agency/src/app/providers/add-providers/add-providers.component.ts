import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProviderClass } from 'src/app/models/providers.class';
import { ProviderService } from 'src/app/services/provider.service';

@Component({
  selector: 'app-add-providers',
  templateUrl: './add-providers.component.html',
  styleUrls: ['./add-providers.component.css']
})
export class AddProvidersComponent implements OnInit, OnDestroy {
  submitted: boolean = false;
  providers: ProviderClass[];
  provider: ProviderClass = new ProviderClass();
  insertedProvider:ProviderClass;
  providersForm!: FormGroup;
  emailError:boolean=false;
  emailErrorMsg ="Invalid email, try again"

  constructor(private providerService:ProviderService) {
    this.providerService.getProviders().subscribe({
      next:(v)=>{this.providers=v;},
      error:(e)=>{console.error(e)}
    })
   }

  ngOnInit(): void {
    this.buildFormControls();

  }
  ngOnDestroy(): void {

  }

  //Form Controls get()
  get f() { return this.providersForm.controls; }



  handleSubmit() {
    if (this.providersForm.valid) {
      this.buildProvider();
      if(!this.isInvalidEmail()){
        this.insertData(this.provider);
      }

    }
  }

  insertData(data:ProviderClass){
    this.providerService.addProvider(data).subscribe({
      next:(v)=>{
        console.log(v)
        this.insertedProvider=v as ProviderClass
        console.log(this.insertedProvider)
        this.emailError=false;
        this.submitted=true;
      },
      error:(e)=>{console.log(e)}
    })
  }

  //Check for duplicate email
   isInvalidEmail(){
    let email = this.providersForm.get("email")?.value;
    if(this.providers.filter(el=>el.company.email===email).length > 0){
      this.emailError=true;
      return true;
    }else{
      return false;
    }
   }

  //Build new Provider Object
  buildProvider(){

    let p = this.providersForm.value;
    this.provider.firstname = p.firstname;
    this.provider.lastname = p.lastname;
    this.provider.position = p.position;
    this.provider.company = {
      company_name: p.company_name,
      address: p.address,
      address2: p.address2,
      city: p.city,
      state: p.state,
      postal_code: p.postal_code,
      email: p.email,
      phone: p.phone,
      description: p.description,
      tagline: p.tagline
    }
    return this.provider
  }

  //Build Form Controls
  buildFormControls(){
    this.providersForm = new FormGroup({
      firstname: new FormControl('John', [Validators.required, Validators.minLength(2), Validators.maxLength(25), Validators.pattern(/^[a-zA-Z]+$/)]),
      lastname: new FormControl('Doe', [Validators.required, Validators.minLength(2), Validators.maxLength(25), Validators.pattern(/^[a-zA-Z]+$/)]),
      position: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required, Validators.minLength(10), Validators.pattern(/^\+?[0-9]{1,4}[0-9\-]+$/)]),
      company_name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      address: new FormControl('', [Validators.required]),
      address2: new FormControl(''),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required, Validators.maxLength(2)]),
      postal_code: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]),
      description: new FormControl('', [Validators.required]),
      tagline: new FormControl('', [Validators.required]),
    })
  }
}
