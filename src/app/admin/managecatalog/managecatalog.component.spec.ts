import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagecatalogComponent } from './managecatalog.component';

describe('ManagecatalogComponent', () => {
  let component: ManagecatalogComponent;
  let fixture: ComponentFixture<ManagecatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagecatalogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagecatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
