import { http, HttpResponse } from 'msw';

export const handlers = [
  http.post('/login', async () => {
    return HttpResponse.json('FAKE_JWT_TOKEN', { status: 200 });
  }),

  http.post('/artist', async ({ request }) => {
    const body = (await request.json()) as { Name: string };
    return HttpResponse.json({ Name: body.Name }, { status: 201 });
  }),

  http.get('/artist/random', () => {
    return HttpResponse.json({ Name: 'cool band' }, { status: 200 });
  }),
];
