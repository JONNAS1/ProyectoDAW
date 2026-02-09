import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaItem } from './ficha-item';

describe('FichaItem', () => {
  let component: FichaItem;
  let fixture: ComponentFixture<FichaItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FichaItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FichaItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
