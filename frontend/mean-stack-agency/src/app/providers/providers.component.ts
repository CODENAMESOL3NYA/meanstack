import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../services/provider.service';
import { Observable } from 'rxjs';
import { ProviderClass } from '../models/providers.class';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styles: [
  ]
})
export class ProvidersComponent implements OnInit{
  providers:ProviderClass[];
  ready=false
  constructor(private providerService$:ProviderService){}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.providerService$.getProviders()
    .subscribe({
      next:(value)=>{
        this.providers=value as ProviderClass[];
        if(this.providers){
          setTimeout(()=>{this.ready=true},600)
        }

      },
      error:(e)=>{console.error(e)}
    })
  }

}
