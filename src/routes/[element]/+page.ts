// src/routes/[element]/+page.ts
import type { PageLoad } from './$types';
import { elements } from '$lib/db';

export const load: PageLoad = ({ params }) => {
  const elementName = params.element.toLowerCase();
  const elementData = elements.find(el => el.name.toLowerCase() === elementName);

  if (!elementData) {
    return {
      status: 404,
      error: new Error('Element not found')
    };
  }

  return {
    elementData
  };
};
