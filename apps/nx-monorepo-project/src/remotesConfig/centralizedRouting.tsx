import { lazy } from 'react';

const CreateRecordApp = lazy(() => import('mf-create-record/app'));
const UpdateRecordApp = lazy(() => import('mf-update-record/app'));
const RecordsListApp = lazy(() => import('mf-records-list/app'));

export const centralizedRouting = [
  {
    path: '/create-record',
    component: CreateRecordApp,
  },
  {
    path: '/update-record',
    component: UpdateRecordApp,
  },
  {
    path: '/records-list',
    component: RecordsListApp,
  },
];
