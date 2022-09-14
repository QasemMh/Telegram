import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsRequestComponent } from './friends-request.component';

describe('FriendsRequestComponent', () => {
  let component: FriendsRequestComponent;
  let fixture: ComponentFixture<FriendsRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendsRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FriendsRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
