import { Sector, DefinitionPuzzle, GraphConnectPuzzle } from "@/types/level";

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
          wisdomText: "A bijeção é o 'par perfeito'. Se todo mundo de A tem um par único em B e não sobra ninguém, eles têm o mesmo tamanho!"
        } as DefinitionPuzzle,
        {
          id: "5.1.2",
          puzzleType: "GraphConnect",
          title: "O Hotel de Hilbert",
          directive: "Hospede um novo cliente no quarto 1 movendo o hóspede do quarto 'n' para o 'n+1'.",
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
          wisdomText: "Incrível! Há tantos números Naturais quanto Inteiros. O infinito dos Naturais é o menor infinito possível."
        } as GraphConnectPuzzle,
        {
          id: "5.2.2",
          puzzleType: "GraphConnect",
          title: "O Argumento de Cantor (Hacking Terminal)",
          directive: "Gere um número real que foge da contagem invertendo a diagonal principal.",
          wisdomText: "O Sistema Colapsou! Você acabou de provar que os Reais são incontáveis. Existem infinitos MAIORES que outros!"
        } as GraphConnectPuzzle
      ]
    }
  ]
};
