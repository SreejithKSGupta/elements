// src/routes/[element]/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
  const series = params.seriesitem?.toLowerCase() || '';
  return { series };
};
