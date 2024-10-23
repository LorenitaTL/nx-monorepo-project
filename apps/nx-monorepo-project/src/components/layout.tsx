import React from 'react';
// import Menu from './menu';
// import { motion } from 'framer-motion';
// import { useNexusStore, useShallow } from '@libs/shared/global-state';
// import clsx from 'clsx';
import { useRouter } from 'next/router';

const Layout = ({ children }: { children: React.ReactNode }) => {
  // const { isAuth } = useNexusStore(useShallow((state) => state.auth));
  const isAuth = true;
  const router = useRouter();
  const featureActive = router.query.feature;
  const isUpdateLead = ['update-property', 'create-property'].includes(
    featureActive as string
  );

  return (
    <div
      className={`min-h-screen bg-layout relative ${
        !isUpdateLead ? 'px-4' : ''
      }`}
    >
      <div
        className={`relative min-h-screen flex flex-col md:flex-row z-20 max-w-${
          !isUpdateLead ? '7xl' : '10xl'
        } mx-auto`}
      >
        {/* {isAuth && <Menu />} */}

        {/* <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={clsx(
            `w-full ${!isUpdateLead ? 'my-6 rounded-lg p-4' : ''}`,
            {
              'bg-white': isAuth,
            }
          )}
        > */}
        <div>{children}</div>

        {/* </motion.div> */}
      </div>

      {/* <style jsx>{`
        .bg-layout {
          background: linear-gradient(168deg, #6c2ab0 16.51%, #2a0a4b 93.48%);
        }

        .shadow-feature-wrapper {
          box-shadow: 0px 25px 50px -12px rgba(0, 0, 0, 0.12);
        }
      `}</style> */}
    </div>
  );
};

export default Layout;
