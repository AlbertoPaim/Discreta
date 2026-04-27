import { Sector, DefinitionPuzzle, GraphConnectPuzzle, GraphSet } from "@/types/level";

const setN: GraphSet = { id: "N", label: "N", nodes: [{id:"1", label:"1"}, {id:"2", label:"2"}, {id:"3", label:"3"}, {id:"4", label:"4"}] };
const setZ: GraphSet = { id: "Z", label: "Z", nodes: [{id:"0", label:"0"}, {id:"1", label:"1"}, {id:"-1", label:"-1"}, {id:"2", label:"2"}] };
const setRooms1: GraphSet = { id: "H1", label: "Hotel (Antes)", nodes: [{id:"r1", label:"1"}, {id:"r2", label:"2"}, {id:"r3", label:"3"}] };
const setRooms2: GraphSet = { id: "H2", label: "Hotel (Depois)", nodes: [{id:"c_new", label:"Novo"}, {id:"r1", label:"1"}, {id:"r2", label:"2"}, {id:"r3", label:"3"}] };

export const sector5: Sector = {
  id: 5,
  title: "O Abismo do Infinito",
  description: "Tratando tamanhos de conjuntos que não têm fim.",
  missions: [
    {
      id: "5.1",
      title: "Cardinalidade e Equivalência",
      description: "Bijeções e o Hotel de Hilbert.",
      microPhases: [
        {
          id: "5.1.1",
          puzzleType: "Definition",
          title: "Equinumerabilidade",
          directive: "Dois conjuntos têm a mesma cardinalidade se, e somente se, existe uma bijeção entre eles.",
          slotsCount: 3,
          correctSequence: ["card_A_eq_card_B", "iff", "exists_bijection"],
          availableRunes: [
            { id: "card_A_eq_card_B", symbol: "|A| = |B|" },
            { id: "iff", symbol: "\\iff" },
            { id: "exists_bijection", symbol: "\\exists f: A \\to B \\text{ bijetora}" },
            { id: "A_sub_B", symbol: "A \\subseteq B" }
          ],
          example: "Exemplo: Se você tem 5 pessoas e 5 cadeiras, todos sentam sem sobrar ninguém. Essa bijeção prova que as quantidades são iguais.",
          wisdomText: "A bijeção é o 'par perfeito'. Se todo mundo de A tem um par único em B e não sobra ninguém, eles têm o mesmo tamanho!"
        } as DefinitionPuzzle,
        {
          id: "5.1.2",
          puzzleType: "GraphConnect",
          title: "O Hotel de Hilbert",
          directive: "Hospede um novo cliente no quarto 1 movendo o hóspede do quarto 'n' para o 'n+1'.",
          sets: [setRooms1, setRooms2],
          mode: 'connect',
          initialEdges: [],
          expectedEdges: [
            {from: 'r1', to: 'r2'}, 
            {from: 'r2', to: 'r3'},
            {from: 'r3', to: 'c_new'} // Simulando o shift infinito
          ],
          validationRule: 'not_injective', // Just a placeholder rule that works for now, or we can just say exact_edges
          example: "Exemplo: Mova o hóspede 1 para o 2, o 2 para o 3... Isso libera o quarto 1 para o novo cliente, provando que Infinito + 1 = Infinito.",
          wisdomText: "No infinito, sempre há espaço. Você acabou de provar que infinito + 1 é do mesmo tamanho que infinito."
        } as GraphConnectPuzzle
      ]
    },
    {
      id: "5.2",
      title: "Os Reinos do Infinito",
      description: "Enumerabilidade e Diagonalização de Cantor.",
      microPhases: [
        {
          id: "5.2.1",
          puzzleType: "GraphConnect",
          title: "Os Inteiros são Enumeráveis",
          directive: "Crie o mapeamento em zigue-zague pareando os Naturais com os Inteiros (positivos e negativos).",
          sets: [setN, setZ],
          mode: 'connect',
          initialEdges: [],
          expectedEdges: [
            {from: '1', to: '0'}, {from: '2', to: '1'}, {from: '3', to: '-1'}, {from: '4', to: '2'}
          ],
          validationRule: 'exact_edges',
          example: "Exemplo: Conte assim: 0, 1, -1, 2, -2... Assim você cria uma bijeção provando que há tantos Naturais quanto Inteiros.",
          wisdomText: "Incrível! Há tantos números Naturais quanto Inteiros. O infinito dos Naturais é o menor infinito possível."
        } as GraphConnectPuzzle,
        {
          id: "5.2.2",
          puzzleType: "GraphConnect",
          title: "O Argumento de Cantor (Hacking Terminal)",
          directive: "Gere um número real que foge da contagem invertendo a diagonal principal.",
          sets: [setN, setZ], // placeholder sets for Cantor
          mode: 'connect',
          initialEdges: [],
          validationRule: 'exact_edges', // just a placeholder
          example: "Exemplo: Para cada número listado, mude seu dígito da diagonal. O novo número formado garante que não estava na lista original.",
          wisdomText: "O Sistema Colapsou! Você acabou de provar que os Reais são incontáveis. Existem infinitos MAIORES que outros!"
        } as GraphConnectPuzzle
      ]
    }
  ]
};
