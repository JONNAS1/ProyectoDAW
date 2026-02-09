import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaList } from './ficha-list';

describe('FichaList', () => {
  let component: FichaList;
  let fixture: ComponentFixture<FichaList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FichaList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FichaList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
