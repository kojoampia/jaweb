import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { ImprintDetailComponent } from './imprint-detail.component';

describe('Imprint Management Detail Component', () => {
  let comp: ImprintDetailComponent;
  let fixture: ComponentFixture<ImprintDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImprintDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: ImprintDetailComponent,
              resolve: { imprint: () => of({ id: 'ABC' }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(ImprintDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImprintDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load imprint on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', ImprintDetailComponent);

      // THEN
      expect(instance.imprint()).toEqual(expect.objectContaining({ id: 'ABC' }));
    });
  });

  describe('PreviousState', () => {
    it('Should navigate to previous state', () => {
      jest.spyOn(window.history, 'back');
      comp.previousState();
      expect(window.history.back).toHaveBeenCalled();
    });
  });
});
