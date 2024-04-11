import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaDesplegableComponent } from './lista-desplegable.component';

describe('ListaDesplegableComponent', () => {
  let component: ListaDesplegableComponent;
  let fixture: ComponentFixture<ListaDesplegableComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaDesplegableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaDesplegableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
