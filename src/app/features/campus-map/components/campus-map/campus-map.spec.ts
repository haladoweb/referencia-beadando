import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampusMap } from './campus-map';

describe('CampusMap', () => {
  let component: CampusMap;
  let fixture: ComponentFixture<CampusMap>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CampusMap]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampusMap);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
