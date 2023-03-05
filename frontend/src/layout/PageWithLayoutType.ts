import { NextPage } from 'next';
import MainLayout from './MainLayout';

type PageWithLayoutType = NextPage & { Layout: typeof MainLayout };

export default PageWithLayoutType;
