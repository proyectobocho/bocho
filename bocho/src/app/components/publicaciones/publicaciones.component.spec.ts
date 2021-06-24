import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicacionesComponent } from './publicaciones.component';

describe('PublicacionesComponent', () => {
  let component: PublicacionesComponent;
  let fixture: ComponentFixture<PublicacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
