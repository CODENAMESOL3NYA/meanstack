import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteProvidersComponent } from './delete-providers.component';

describe('DeleteProvidersComponent', () => {
  let component: DeleteProvidersComponent;
  let fixture: ComponentFixture<DeleteProvidersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteProvidersComponent]
    });
    fixture = TestBed.createComponent(DeleteProvidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
