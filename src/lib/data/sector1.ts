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
          example: "Exemplo: 'A Terra é redonda' (V) e '2 + 2 = 5' (F) são proposições. Já 'Que horas são?' não é.",
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
          example: "Exemplo: Se p é 'Está chovendo', então ou p é verdadeiro (está), ou ~p é verdadeiro (não está).",
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
          example: "Exemplo: Se p = 'O céu é azul' (V), então a negação ~p = 'O céu NÃO é azul' (F).",
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
          example: "Exemplo: A afirmação 'Trabalhei (p) E estudei (q)' só é verdade se eu fiz ambas as coisas.",
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
          example: "Exemplo: 'Se tirar nota 10 (p), te dou 50 reais (q)'. Eu só minto se você tirar 10 e eu não pagar.",
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
          example: "Exemplo: 'Se 2=3 (F), então o céu é verde (F)'. Essa frase inteira é Verdadeira vacuamente.",
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
          example: "Exemplo: 'Chove ou não chove' (p ∨ ~p). Em qualquer clima, a frase é Verdadeira.",
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
          example: "Exemplo: 'Chove e não chove aqui e agora' (p ∧ ~p). É impossível, sempre Falso.",
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
          example: "Exemplo: Negar que 'Comprei pão OU leite' é o mesmo que 'NÃO comprei pão E NÃO comprei leite'.",
          wisdomText: "A negação de uma disjunção é a conjunção das negações.",
          availableStatements: [
            { id: "s1", symbol: "\\sim (p \\lor q)" },
            { id: "s2", symbol: "\\sim p \\land \\sim q" },
            { id: "s3", symbol: "p \\implies q" }
          ],
          availableJustifications: [
            { id: "j1", symbol: "\\text{Premissa}" },
            { id: "j2", symbol: "\\text{De Morgan (Disjunção)}" }
          ],
          expectedProof: [
            { statementId: "s1", justificationId: "j1" },
            { statementId: "s2", justificationId: "j2" }
          ]
        } as ProofBuilderPuzzle,
        {
          id: "1.4.2",
          puzzleType: "ProofBuilder",
          title: "A Contrapositiva",
          directive: "Prove que p -> q equivale a ~q -> ~p.",
          example: "Exemplo: 'Se nasci no Brasil (p), sou sul-americano (q)' equivale a 'Se NÃO sou sul-americano (~q), NÃO nasci no Brasil (~p)'.",
          wisdomText: "Se chove, molha. Se não molhou, não choveu. Lógica pura!",
          availableStatements: [
            { id: "s1", symbol: "p \\implies q" },
            { id: "s2", symbol: "\\sim p \\lor q" },
            { id: "s3", symbol: "q \\lor \\sim p" },
            { id: "s4", symbol: "\\sim (\\sim q) \\lor \\sim p" },
            { id: "s5", symbol: "\\sim q \\implies \\sim p" }
          ],
          availableJustifications: [
            { id: "j1", symbol: "\\text{Premissa}" },
            { id: "j2", symbol: "\\text{Def. Implicação}" },
            { id: "j3", symbol: "\\text{Comutatividade}" },
            { id: "j4", symbol: "\\text{Negação Dupla}" },
            { id: "j5", symbol: "\\text{Def. Implicação (Inversa)}" }
          ],
          expectedProof: [
            { statementId: "s1", justificationId: "j1" },
            { statementId: "s2", justificationId: "j2" },
            { statementId: "s3", justificationId: "j3" },
            { statementId: "s4", justificationId: "j4" },
            { statementId: "s5", justificationId: "j5" }
          ]
        } as ProofBuilderPuzzle
      ]
    }
  ]
};
