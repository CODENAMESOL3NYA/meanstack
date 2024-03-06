import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProviderClass } from 'src/app/models/providers.class';
import { ProviderService } from 'src/app/services/provider.service';

@Component({
  selector: 'app-details-providers',
  templateUrl: './details-providers.component.html',
  styleUrls: ['./details-providers.component.css']
})
export class DetailsProvidersComponent implements OnInit {
  constructor(private providerService: ProviderService, private route: ActivatedRoute) {
    this.route.paramMap.subscribe({
      next: (p) => { this.param = p.get('id')?.toString() },
      error: (e) => { console.error(e) }
    })


  }
  providerForm!: FormGroup;
  provider: ProviderClass;
  param?: string;

  ngOnInit(): void {
    this.getProvider();
  }
  //Get Provider
  getProvider() {
    this.providerService.getProviderById(this.param).subscribe({
      next: (p) => {
        let data = p[0];
        this.provider = this.buildProvider(data);
      },
      error: (e) => { console.error(e) }
    });
  }
  //Build a provider
  buildProvider(data: any): ProviderClass {
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
