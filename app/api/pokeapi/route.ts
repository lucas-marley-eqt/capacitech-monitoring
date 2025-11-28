import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // 1. Pega o parametro "name" da URL (ex: /api/pokeapi?name=pikachu)
    const { searchParams } = new URL(request.url);
    const name = searchParams.get('name');

    let apiUrl;
    
    // 2. Define qual URL da PokeAPI vamos chamar
    if (name) {
      // Se tiver nome, busca o específico (convertido para minúsculo)
      apiUrl = `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`;
    } else {
      // Se não tiver nome, busca a lista padrão
      apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=20';
    }

    const apiResponse = await fetch(apiUrl);

    // 3. Tratamento especial para 404 (Pokémon não encontrado)
    if (apiResponse.status === 404) {
      // Retornamos uma lista vazia para o frontend não quebrar
      return NextResponse.json({ results: [] }, { status: 200 });
    }

    if (!apiResponse.ok) {
        return NextResponse.json(
            { message: 'Erro na PokeAPI' },
            { status: apiResponse.status }
        );
    }

    const data = await apiResponse.json();

    // 4. Normalização de dados
    // A PokeAPI retorna estruturas diferentes para "Lista" e "Item Único".
    // Vamos padronizar tudo para parecer uma lista { results: [] }
    let normalizedResponse;

    if (name) {
        // Se for busca específica, o "data" é o objeto do pokemon. 
        // Colocamos ele dentro de um array "results"
        normalizedResponse = {
            results: [{
                name: data.name,
                url: `https://pokeapi.co/api/v2/pokemon/${data.id}/` // recria a URL baseada no ID
            }]
        };
    } else {
        // Se for lista, já vem no formato certo
        normalizedResponse = data;
    }
    
    return NextResponse.json(normalizedResponse, { status: 200 });

  } catch (error) {
    console.error('Erro backend:', error);
    return NextResponse.json(
        { message: 'Erro interno do servidor' }, 
        { status: 500 }
    );
  }
}