import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsProvidersComponent } from './details-providers.component';

describe('DetailsProvidersComponent', () => {
  let component: DetailsProvidersComponent;
  let fixture: ComponentFixture<DetailsProvidersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsProvidersComponent]
    });
    fixture = TestBed.createComponent(DetailsProvidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
