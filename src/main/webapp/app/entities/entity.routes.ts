import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'authority',
    data: { pageTitle: 'jojoaddisonApp.adminAuthority.home.title' },
    loadChildren: () => import('./admin/authority/authority.routes'),
  },
  {
    path: 'slide',
    data: { pageTitle: 'jojoaddisonApp.slide.home.title' },
    loadChildren: () => import('./slide/slide.routes'),
  },
  {
    path: 'service',
    data: { pageTitle: 'jojoaddisonApp.service.home.title' },
    loadChildren: () => import('./service/service.routes'),
  },
  {
    path: 'about',
    data: { pageTitle: 'jojoaddisonApp.about.home.title' },
    loadChildren: () => import('./about/about.routes'),
  },
  {
    path: 'privilege',
    data: { pageTitle: 'jojoaddisonApp.privilege.home.title' },
    loadChildren: () => import('./privilege/privilege.routes'),
  },
  {
    path: 'blog',
    data: { pageTitle: 'jojoaddisonApp.blog.home.title' },
    loadChildren: () => import('./blog/blog.routes'),
  },
  {
    path: 'career',
    data: { pageTitle: 'jojoaddisonApp.career.home.title' },
    loadChildren: () => import('./career/career.routes'),
  },
  {
    path: 'contact',
    data: { pageTitle: 'jojoaddisonApp.contact.home.title' },
    loadChildren: () => import('./contact/contact.routes'),
  },
  {
    path: 'contact-message',
    data: { pageTitle: 'jojoaddisonApp.contactMessage.home.title' },
    loadChildren: () => import('./contact-message/contact-message.routes'),
  },
  {
    path: 'imprint',
    data: { pageTitle: 'jojoaddisonApp.imprint.home.title' },
    loadChildren: () => import('./imprint/imprint.routes'),
  },
  {
    path: 'information',
    data: { pageTitle: 'jojoaddisonApp.information.home.title' },
    loadChildren: () => import('./information/information.routes'),
  },
  {
    path: 'portfolio',
    data: { pageTitle: 'jojoaddisonApp.portfolio.home.title' },
    loadChildren: () => import('./portfolio/portfolio.routes'),
  },
  {
    path: 'partner',
    data: { pageTitle: 'jojoaddisonApp.partner.home.title' },
    loadChildren: () => import('./partner/partner.routes'),
  },
  {
    path: 'staff',
    data: { pageTitle: 'jojoaddisonApp.staff.home.title' },
    loadChildren: () => import('./staff/staff.routes'),
  },
  {
    path: 'product',
    data: { pageTitle: 'jojoaddisonApp.product.home.title' },
    loadChildren: () => import('./product/product.routes'),
  },
  /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
];

export default routes;
