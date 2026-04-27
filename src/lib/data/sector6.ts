import { Sector, DefinitionPuzzle, GraphConnectPuzzle } from "@/types/level";

export const sector6: Sector = {
  id: 6,
  title: "A Forja Combinatória",
  description: "A arte de contar sem enumerar.",
  missions: [
    {
      id: "6.1",
      title: "Princípios Básicos",
      description: "Princípio da Adição e Princípio Multiplicativo.",
      microPhases: [
        {
          id: "6.1.1",
          puzzleType: "Definition",
          title: "Princípio da Adição",
          directive: "Se dois eventos A e B são mutuamente exclusivos, as formas de acontecer A OU B são...",
          slotsCount: 3,
          correctSequence: ["card_AUB", "eq", "card_A_plus_card_B"],
          availableRunes: [
            { id: "card_AUB", symbol: "|A \\cup B|" },
            { id: "eq", symbol: "=" },
            { id: "card_A_plus_card_B", symbol: "|A| + |B|" },
            { id: "card_A_times_card_B", symbol: "|A| \\times |B|" }
          ],
          example: "Exemplo: Vou de carro (2 opções) OU de ônibus (3 opções). Como não posso ir nos dois ao mesmo tempo, tenho 2+3 = 5 formas de ir.",
          wisdomText: "Exclusividade significa que a interseção é vazia. A união é pura adição!"
        } as DefinitionPuzzle,
        {
          id: "6.1.2",
          puzzleType: "Definition",
          title: "Princípio Multiplicativo",
          directive: "Para decisões sucessivas e independentes, o total de caminhos é o Produto Cartesiano.",
          slotsCount: 3,
          correctSequence: ["card_A_times_B", "eq", "card_A_times_card_B"],
          availableRunes: [
            { id: "card_A_times_B", symbol: "|A \\times B|" },
            { id: "eq", symbol: "=" },
            { id: "card_A_times_card_B", symbol: "|A| \\times |B|" },
            { id: "card_A_plus_card_B", symbol: "|A| + |B|" }
          ],
          example: "Exemplo: Vou escolher 1 camisa (3 opções) E 1 calça (2 opções). O total de combinações visuais é 3 * 2 = 6.",
          wisdomText: "Para cada escolha no primeiro evento, você abre N novos caminhos no segundo. É uma árvore de multiplicação."
        } as DefinitionPuzzle
      ]
    },
    {
      id: "6.2",
      title: "Agrupamentos",
      description: "Fatorial, Arranjos e Combinações.",
      microPhases: [
        {
          id: "6.2.1",
          puzzleType: "Definition",
          title: "Permutação Simples",
          directive: "O número de formas de alinhar n objetos distintos é P(n) =",
          slotsCount: 1,
          correctSequence: ["n_fact"],
          availableRunes: [
            { id: "n_fact", symbol: "n!" },
            { id: "n_squared", symbol: "n^2" },
            { id: "2_to_n", symbol: "2^n" }
          ],
          example: "Exemplo: De quantas formas 3 pessoas formam uma fila? 3! = 3 * 2 * 1 = 6 formas diferentes.",
          wisdomText: "n opções para a 1ª vaga, (n-1) para a 2ª... O fatorial é o princípio multiplicativo levado ao extremo da fila!"
        } as DefinitionPuzzle,
        {
          id: "6.2.2",
          puzzleType: "Definition",
          title: "Arranjo Simples",
          directive: "Escolher p elementos entre n, onde a ORDEM IMPORTA.",
          slotsCount: 3,
          correctSequence: ["A_np", "eq", "n_fact_div_n_minus_p_fact"],
          availableRunes: [
            { id: "A_np", symbol: "A_{n,p}" },
            { id: "eq", symbol: "=" },
            { id: "n_fact_div_n_minus_p_fact", symbol: "\\frac{n!}{(n-p)!}" },
            { id: "C_np", symbol: "C_{n,p}" }
          ],
          example: "Exemplo: Pódio (Ouro e Prata) para 10 corredores. A ordem importa! A(10,2) = 10! / 8! = 10 * 9 = 90 opções.",
          wisdomText: "O Arranjo corta o fatorial. Nós paramos de multiplicar assim que preenchemos as 'p' vagas."
        } as DefinitionPuzzle,
        {
          id: "6.2.3",
          puzzleType: "Definition",
          title: "Combinação Simples",
          directive: "Escolher p elementos entre n, onde a ORDEM NÃO IMPORTA. Elimine as permutações internas do grupo.",
          slotsCount: 3,
          correctSequence: ["C_np", "eq", "A_np_div_p_fact"],
          availableRunes: [
            { id: "C_np", symbol: "C_{n,p}" },
            { id: "eq", symbol: "=" },
            { id: "A_np_div_p_fact", symbol: "\\frac{A_{n,p}}{p!}" },
            { id: "A_np", symbol: "A_{n,p}" }
          ],
          example: "Exemplo: Escolher 2 pessoas de 10 para uma dupla de trabalho. A ordem não importa! C(10,2) = 90 / 2! = 45 opções.",
          wisdomText: "Como a ordem não importa, a equipe {A,B} é a mesma que {B,A}. Dividimos pelo fatorial de p para 'apagar' essas permutações repetidas!"
        } as DefinitionPuzzle
      ]
    }
  ]
};
