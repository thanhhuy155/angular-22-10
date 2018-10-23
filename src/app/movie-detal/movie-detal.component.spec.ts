import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDetalComponent } from './movie-detal.component';

describe('MovieDetalComponent', () => {
  let component: MovieDetalComponent;
  let fixture: ComponentFixture<MovieDetalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieDetalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieDetalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
