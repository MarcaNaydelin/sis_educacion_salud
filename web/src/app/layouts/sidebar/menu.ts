// menu.ts

import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
    {
        id: 1,
        label: 'MENUITEMS.MENU.TEXT',
        isTitle: true
    },
    {
        id: 2,
        label: 'Inicio',
        icon: 'bx-home-circle',
        link: '/',
        isMain: true
    },
    {
        id: 3,
        label: 'Gestión',
        isTitle: true
    },
    {
        id: 4,
        label: 'Servicios',
        icon: 'bx-briefcase',
        link: '/service',
        subject: 'services',
        action: 'view'
    },
    {
        id: 5,
        label: 'Usuarios',
        icon: 'bx-user',
        link: '/user',
        subject: 'users',
        action: 'view'
    },
    {
        id: 6,
        label: 'Hospitales',
        icon: 'bx-building-house',
        link: '/hospital',
        subject: 'hospitals',
        action: 'view'
    },
    {
      id: 7,
      label: 'Roles',
      icon: 'bx bx-check-shield',
      link: '/rol',
      subject: 'roles',
      action: 'view'
    },
    {
      id: 8,
      label: 'Colegios/Escuelas',
      icon: 'bx bx-building',
      link: '/school',
      subject: 'schools',
      action: 'view'
    },
    {
      id: 9,
      label: 'Cursos',
      icon: 'bx bx-chalkboard',
      link: '/course',
      subject: 'courses',
      action: 'view'
    },
    {
        id: 10,
        label: 'Cliente',
        isTitle: true
    },
    {
        id: 11,
        label: 'Vista final',
        icon: 'bx-user',
        link: '/client',
        subject: 'users',
        action: 'view'
    }
];
