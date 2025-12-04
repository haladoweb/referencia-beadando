import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingsList } from './buildings-list';

describe('BuildingsList', () => {
  let component: BuildingsList;
  let fixture: ComponentFixture<BuildingsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuildingsList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuildingsList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
