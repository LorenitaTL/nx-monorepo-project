import { centralizedRouting } from '../../remotesConfig/centralizedRouting';

import type {
  InferGetStaticPropsType,
  GetStaticProps,
  GetStaticPaths,
} from 'next';

const FeaturePage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const Component = centralizedRouting.find(
    (item) => item.path.slice(1) === props.feature
  )?.component;

  if (!Component) {
    throw new Error('Component not found - check centralizedRouting');
  }

  return <Component />;
};

export const getStaticPaths = (async () => {
  const paths = centralizedRouting.map((route) => ({
    params: {
      feature: route.path.slice(1),
    },
  }));
  return {
    paths,
    fallback: false,
  };
}) satisfies GetStaticPaths;

export const getStaticProps = (async (context) => {
  return {
    props: {
      feature: context.params?.feature,
    },
  };
}) satisfies GetStaticProps;

export default FeaturePage;
