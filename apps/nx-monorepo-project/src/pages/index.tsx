import React, { lazy } from 'react';

const CreateRecordApp = lazy(() => import('mf-create-record/app'));
const UpdateRecordApp = lazy(() => import('mf-update-record/app'));
const RecordsListApp = lazy(() => import('mf-records-list/app'));

export function nxMonorepoProject() {
  return (
    <div>
      <h1>Welcome to nx-monorepo-project test!</h1>
      <CreateRecordApp />
      <UpdateRecordApp />
      <RecordsListApp />
    </div>
  );
}

export default nxMonorepoProject;
