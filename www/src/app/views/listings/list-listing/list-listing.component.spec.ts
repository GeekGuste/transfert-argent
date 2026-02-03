import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListListingComponent } from './list-listing.component';

describe('ListListingComponent', () => {
  let component: ListListingComponent;
  let fixture: ComponentFixture<ListListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListListingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
