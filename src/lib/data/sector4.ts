import { Sector, DefinitionPuzzle, ProofBuilderPuzzle } from "@/types/level";

export const sector4: Sector = {
  id: 4,
  title: "A Torre da Indução",
  description: "Escalando para o infinito através de recursão.",
  missions: [
    {
      id: "4.1",
      title: "Fundamentos (Axiomática de Peano)",
      description: "O Sucessor e a Adição Recursiva.",
      microPhases: [
        {
          id: "4.1.1",
          puzzleType: "Definition",
          title: "A Função Sucessor",
          directive: "Defina que o sucessor de n nunca é 0 (assumindo N com 0).",
          slotsCount: 3,
          correctSequence: ["forall_n", "Sn", "neq_0"],
          availableRunes: [
            { id: "forall_n", symbol: "\\forall n \\in \\mathbb{N}" },
            { id: "Sn", symbol: "S(n)" },
            { id: "neq_0", symbol: "\\neq 0" },
            { id: "eq_0", symbol: "= 0" }
          ],
          example: "Exemplo: S(0) = 1, S(1) = 2. Como os Naturais começam em 0, não existe nenhum n tal que S(n) = 0.",
          wisdomText: "O zero é a base da torre, nada vem antes dele. A função sucessor só sobe!"
        } as DefinitionPuzzle,
        {
          id: "4.1.2",
          puzzleType: "Definition",
          title: "Adição Recursiva",
          directive: "Defina como somar usando apenas a função sucessor: m + S(n) = ?",
          slotsCount: 3,
          correctSequence: ["m_plus_Sn", "eq", "S_m_plus_n"],
          availableRunes: [
            { id: "m_plus_Sn", symbol: "m + S(n)" },
            { id: "eq", symbol: "=" },
            { id: "S_m_plus_n", symbol: "S(m + n)" },
            { id: "m_plus_n", symbol: "m + n" }
          ],
          example: "Exemplo: 5 + S(2) = 5 + 3 = 8. Isso é matematicamente igual a S(5 + 2) = S(7) = 8.",
          wisdomText: "Você acabou de desvendar a recursão! Para somar o próximo número, você tira o 'próximo' da parcela e o aplica no resultado global."
        } as DefinitionPuzzle
      ]
    },
    {
      id: "4.2",
      title: "O Princípio da Indução Matemática",
      description: "Provas de base e passo indutivo.",
      microPhases: [
        {
          id: "4.2.1",
          puzzleType: "ProofBuilder",
          title: "Validando o Caso Base",
          directive: "O primeiro dominó precisa cair. Prove P(0) ou P(1).",
          example: "Exemplo: Para provar que 2^n > n, o caso base (n=1) é: 2^1 > 1 (Verdadeiro!).",
          wisdomText: "Sem o alicerce, a torre desmorona antes de começar."
        } as ProofBuilderPuzzle,
        {
          id: "4.2.2",
          puzzleType: "ProofBuilder",
          title: "O Passo Indutivo",
          directive: "Assuma a Hipótese de Indução P(k) e mostre que ela força P(k+1).",
          example: "Exemplo: Se assumirmos que k dominós caíram (P(k) é verdade), provamos algebraicamente que o dominó k+1 também cairá.",
          wisdomText: "Se você garante que um degrau te leva ao próximo, você pode subir infinitamente!"
        } as ProofBuilderPuzzle,
        {
          id: "4.2.3",
          puzzleType: "ProofBuilder",
          title: "A Soma de Gauss",
          directive: "Prove por indução a fórmula da soma dos primeiros n números naturais.",
          example: "Exemplo: Para n=100, a fórmula n(n+1)/2 nos dá 100*101/2 = 5050 instantaneamente.",
          wisdomText: "Gauss ficaria orgulhoso. Você automatizou uma soma infinita usando Indução."
        } as ProofBuilderPuzzle
      ]
    }
  ]
};
