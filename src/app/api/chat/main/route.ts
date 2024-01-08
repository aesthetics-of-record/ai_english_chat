export const dynamic = 'force-dynamic';

import { apiOrigin } from '@/configs/urls';
import axios from 'axios';

export async function POST(req: Request) {
  // const body = await req.json();
  // console.log(body);

  const requestUrl = new URL(req.url);
  const id = requestUrl.searchParams.get('id');

  const response = await axios.post(apiOrigin + '/api/v1/gpt4?id=' + id);

  console.log(response);

  return Response.json(response.data);
}
