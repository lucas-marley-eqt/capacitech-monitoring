export type GetHello = {
    message: string;
    date: string
}

export async function GET() {
  const data: GetHello = {
    message: "Hello from the API!",
    date: new Date().toISOString() // Isso retorna uma string ISO formatada
  };
  
  return Response.json(data);
}