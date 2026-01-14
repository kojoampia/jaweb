import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { AboutDetailComponent } from './about-detail.component';

describe('About Management Detail Component', () => {
  let comp: AboutDetailComponent;
  let fixture: ComponentFixture<AboutDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: AboutDetailComponent,
              resolve: { about: () => of({ id: 'ABC' }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(AboutDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load about on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', AboutDetailComponent);

      // THEN
      expect(instance.about()).toEqual(expect.objectContaining({ id: 'ABC' }));
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
