import { Sector, DefinitionPuzzle, GraphConnectPuzzle } from "@/types/level";

export const sector2: Sector = {
  id: 2,
  title: "O Arquipélago dos Conjuntos",
  description: "A base de dados do universo matemático.",
  missions: [
    {
      id: "2.1",
      title: "Coleções e Relações Básicas",
      description: "Pertinência, Inclusão e Extensionalidade.",
      microPhases: [
        {
          id: "2.1.1",
          puzzleType: "Definition",
          title: "Pertinência vs Inclusão",
          directive: "Estar em um conjunto versus Ser um subconjunto. Forje que A está contido em B se todo x em A também está em B.",
          slotsCount: 4,
          correctSequence: ["A_sub_B", "iff", "forall_x_A", "x_in_B"],
          availableRunes: [
            { id: "A_sub_B", symbol: "A \\subseteq B" },
            { id: "iff", symbol: "\\iff" },
            { id: "forall_x_A", symbol: "\\forall x \\in A" },
            { id: "x_in_B", symbol: "x \\in B" },
            { id: "in", symbol: "\\in" }
          ],
          wisdomText: "A Inclusão compara coleções. A Pertinência conecta o indivíduo à coleção."
        } as DefinitionPuzzle,
        {
          id: "2.1.2",
          puzzleType: "Definition",
          title: "Axioma da Extensionalidade",
          directive: "Dois conjuntos são iguais se têm os mesmos elementos.",
          slotsCount: 3,
          correctSequence: ["A_eq_B", "iff", "forall_x_eq"],
          availableRunes: [
            { id: "A_eq_B", symbol: "A = B" },
            { id: "iff", symbol: "\\iff" },
            { id: "forall_x_eq", symbol: "\\forall x (x \\in A \\iff x \\in B)" },
            { id: "A_sub_B", symbol: "A \\subseteq B" }
          ],
          wisdomText: "Extensionalidade significa que a identidade de um conjunto é puramente determinada pelo que está dentro dele!"
        } as DefinitionPuzzle
      ]
    },
    {
      id: "2.2",
      title: "Operadores de Conjuntos",
      description: "União, Interseção e Diferença Simétrica.",
      microPhases: [
        {
          id: "2.2.1",
          puzzleType: "Definition",
          title: "O Portal da União",
          directive: "Estar na União significa pertencer a A OU pertencer a B.",
          slotsCount: 3,
          correctSequence: ["x_in_AUB", "iff", "x_in_A_or_B"],
          availableRunes: [
            { id: "x_in_AUB", symbol: "x \\in A \\cup B" },
            { id: "iff", symbol: "\\iff" },
            { id: "x_in_A_or_B", symbol: "x \\in A \\lor x \\in B" },
            { id: "x_in_A_and_B", symbol: "x \\in A \\land x \\in B" }
          ],
          wisdomText: "A união é inclusiva: o conectivo lógico 'OU' (\\lor) é o motor desta operação."
        } as DefinitionPuzzle,
        {
          id: "2.2.2",
          puzzleType: "Definition",
          title: "O Cristal da Interseção",
          directive: "Estar na Interseção exige pertencer a A E a B.",
          slotsCount: 3,
          correctSequence: ["x_in_AcapB", "iff", "x_in_A_and_B"],
          availableRunes: [
            { id: "x_in_AcapB", symbol: "x \\in A \\cap B" },
            { id: "iff", symbol: "\\iff" },
            { id: "x_in_A_and_B", symbol: "x \\in A \\land x \\in B" },
            { id: "x_in_A_or_B", symbol: "x \\in A \\lor x \\in B" }
          ],
          wisdomText: "A interseção é exclusiva: o conectivo lógico 'E' (\\land) funciona como um filtro estrito."
        } as DefinitionPuzzle,
        {
          id: "2.2.3",
          puzzleType: "Definition",
          title: "Diferença Simétrica",
          directive: "Forje a Diferença Simétrica: Estar em A ou em B, mas não em ambos.",
          slotsCount: 3,
          correctSequence: ["A_delta_B", "eq", "AUB_minus_AcapB"],
          availableRunes: [
            { id: "A_delta_B", symbol: "A \\Delta B" },
            { id: "eq", symbol: "=" },
            { id: "AUB_minus_AcapB", symbol: "(A \\cup B) \\setminus (A \\cap B)" },
            { id: "A_minus_B", symbol: "A \\setminus B" }
          ],
          wisdomText: "A Diferença Simétrica é como o 'OU Exclusivo' (XOR) da Lógica, aplicado aos conjuntos."
        } as DefinitionPuzzle
      ]
    },
    {
      id: "2.3",
      title: "Estruturas Avançadas",
      description: "Conjunto das Partes e Produto Cartesiano.",
      microPhases: [
        {
          id: "2.3.1",
          puzzleType: "Definition",
          title: "O Conjunto das Partes",
          directive: "P(A) é o conjunto de todos os subconjuntos de A.",
          slotsCount: 3,
          correctSequence: ["X_in_PA", "iff", "X_sub_A"],
          availableRunes: [
            { id: "X_in_PA", symbol: "X \\in \\mathcal{P}(A)" },
            { id: "iff", symbol: "\\iff" },
            { id: "X_sub_A", symbol: "X \\subseteq A" },
            { id: "X_in_A", symbol: "X \\in A" }
          ],
          wisdomText: "Magia dimensional: Os elementos do Conjunto das Partes são os próprios subconjuntos!"
        } as DefinitionPuzzle,
        {
          id: "2.3.2",
          puzzleType: "GraphConnect",
          title: "O Produto Cartesiano",
          directive: "Cruze os eixos visuais para formar pares ordenados.",
          wisdomText: "O Produto Cartesiano forma a malha para onde mapeamos todas as relações bidimensionais."
        } as GraphConnectPuzzle
      ]
    }
  ]
};
