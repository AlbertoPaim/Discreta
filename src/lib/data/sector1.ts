import { Sector, DefinitionPuzzle, ProofBuilderPuzzle } from "@/types/level";

export const sector1: Sector = {
  id: 1,
  title: "As Ruínas da Lógica Proposicional",
  description: "Introdução à linguagem matemática e conectivos lógicos.",
  missions: [
    {
      id: "1.1",
      title: "Fundamentos da Proposição",
      description: "Identificar proposições e princípios lógicos básicos.",
      microPhases: [
        {
          id: "1.1.1",
          puzzleType: "Definition",
          title: "O que é uma Proposição?",
          directive: "Defina o que é uma proposição matemática.",
          slotsCount: 2,
          correctSequence: ["afirmacao", "V_ou_F"],
          availableRunes: [
            { id: "afirmacao", symbol: "\\text{Afirmação}" },
            { id: "V_ou_F", symbol: "\\in \\{V, F\\}" },
            { id: "pergunta", symbol: "\\text{Pergunta}" }
          ],
          wisdomText: "Exato! Uma proposição é uma sentença declarativa que pode ser classificada exclusivamente como Verdadeira ou Falsa."
        } as DefinitionPuzzle,
        {
          id: "1.1.2",
          puzzleType: "Definition",
          title: "O Terceiro Excluído",
          directive: "A proposição p deve ser verdadeira ou falsa, não havendo terceira opção.",
          slotsCount: 3,
          correctSequence: ["p", "lor", "neg_p"],
          availableRunes: [
            { id: "p", symbol: "p" },
            { id: "lor", symbol: "\\lor" },
            { id: "neg_p", symbol: "\\neg p" },
            { id: "land", symbol: "\\land" }
          ],
          wisdomText: "O Princípio do Terceiro Excluído garante que ou 'p' é verdade, ou sua negação é. Não há meio termo!"
        } as DefinitionPuzzle
      ]
    },
    {
      id: "1.2",
      title: "Os Conectivos (Portas Lógicas)",
      description: "Negação, Conjunção, Disjunção e Condicionais.",
      microPhases: [
        {
          id: "1.2.1",
          puzzleType: "Definition",
          title: "A Negação Lógica",
          directive: "Defina a negação de p (inverte o valor lógico).",
          slotsCount: 2,
          correctSequence: ["sim", "p"],
          availableRunes: [
            { id: "sim", symbol: "\\sim" },
            { id: "p", symbol: "p" },
            { id: "q", symbol: "q" }
          ],
          wisdomText: "A negação troca Verdadeiro por Falso e vice-versa."
        } as DefinitionPuzzle,
        {
          id: "1.2.2",
          puzzleType: "Definition",
          title: "Conjunção e Disjunção",
          directive: "Forje a expressão 'p E q'.",
          slotsCount: 3,
          correctSequence: ["p", "land", "q"],
          availableRunes: [
            { id: "p", symbol: "p" },
            { id: "land", symbol: "\\land" },
            { id: "q", symbol: "q" },
            { id: "lor", symbol: "\\lor" }
          ],
          wisdomText: "A conjunção (E) só é verdadeira quando ambos são verdadeiros."
        } as DefinitionPuzzle,
        {
          id: "1.2.3",
          puzzleType: "Definition",
          title: "Condicional e Bicondicional",
          directive: "Forje a expressão 'p implica q'.",
          slotsCount: 3,
          correctSequence: ["p", "implies", "q"],
          availableRunes: [
            { id: "p", symbol: "p" },
            { id: "implies", symbol: "\\implies" },
            { id: "q", symbol: "q" },
            { id: "iff", symbol: "\\iff" }
          ],
          wisdomText: "A condicional só é falsa se p for Verdadeiro e q for Falso (a promessa quebrada)."
        } as DefinitionPuzzle
      ]
    },
    {
      id: "1.3",
      title: "O Motor de Verdade (Tabelas)",
      description: "Tabelas-verdade, Tautologias e Contradições.",
      microPhases: [
        {
          id: "1.3.1",
          puzzleType: "Definition",
          title: "A Linha Crítica da Implicação",
          directive: "Na condicional p -> q, se p é Falso e q é Verdadeiro, o resultado é...",
          slotsCount: 1,
          correctSequence: ["V"],
          availableRunes: [
            { id: "V", symbol: "\\text{Verdadeiro}" },
            { id: "F", symbol: "\\text{Falso}" }
          ],
          wisdomText: "Exatamente! Uma premissa falsa pode implicar qualquer coisa, a implicação é considerada verdadeira (Verdade Vacuamente)."
        } as DefinitionPuzzle,
        {
          id: "1.3.2",
          puzzleType: "Definition",
          title: "Tautologias (O escudo perfeito)",
          directive: "Defina Tautologia: Uma proposição cujo resultado é...",
          slotsCount: 2,
          correctSequence: ["sempre", "V"],
          availableRunes: [
            { id: "sempre", symbol: "\\forall \\text{ casos, }" },
            { id: "V", symbol: "\\text{Verdadeiro}" },
            { id: "F", symbol: "\\text{Falso}" }
          ],
          wisdomText: "Uma tautologia é uma blindagem lógica: não importa o cenário, ela sempre se sustenta!"
        } as DefinitionPuzzle,
        {
          id: "1.3.3",
          puzzleType: "Definition",
          title: "Contradições (O curto-circuito)",
          directive: "Uma contradição é uma proposição que...",
          slotsCount: 2,
          correctSequence: ["sempre", "F"],
          availableRunes: [
            { id: "sempre", symbol: "\\forall \\text{ casos, }" },
            { id: "F", symbol: "\\text{Falsa}" },
            { id: "V", symbol: "\\text{Verdadeira}" }
          ],
          wisdomText: "A contradição é o oposto da tautologia, sempre colapsa."
        } as DefinitionPuzzle
      ]
    },
    {
      id: "1.4",
      title: "Leis e Equivalências",
      description: "Leis de De Morgan e Contrapositivas.",
      microPhases: [
        {
          id: "1.4.1",
          puzzleType: "ProofBuilder",
          title: "As Leis de De Morgan",
          directive: "Prove que não(p ou q) é equivalente a (não p) e (não q).",
          wisdomText: "A negação de uma disjunção é a conjunção das negações."
        } as ProofBuilderPuzzle,
        {
          id: "1.4.2",
          puzzleType: "ProofBuilder",
          title: "A Contrapositiva",
          directive: "Prove que p -> q equivale a ~q -> ~p.",
          wisdomText: "Se chove, molha. Se não molhou, não choveu. Lógica pura!"
        } as ProofBuilderPuzzle
      ]
    }
  ]
};
