import { Sector, DefinitionPuzzle, GraphConnectPuzzle, ProofBuilderPuzzle, GraphSet } from "@/types/level";

const setA: GraphSet = { id: "A", label: "A", nodes: [{id:"1", label:"1"}, {id:"2", label:"2"}, {id:"3", label:"3"}] };
const setB: GraphSet = { id: "B", label: "B", nodes: [{id:"a", label:"a"}, {id:"b", label:"b"}, {id:"c", label:"c"}, {id:"d", label:"d"}] };
const setC: GraphSet = { id: "C", label: "C", nodes: [{id:"x", label:"x"}, {id:"y", label:"y"}, {id:"z", label:"z"}] };


export const sector3: Sector = {
  id: 3,
  title: "O Labirinto das Relações e Funções",
  description: "O núcleo do jogo. Relações estritas e mapeamentos.",
  missions: [
    {
      id: "3.1",
      title: "Definições Fundamentais",
      description: "Conecte os termos lógicos para forjar os conceitos básicos de funções.",
      microPhases: [
        {
          id: "3.1.1", puzzleType: "Definition", title: "Domínio e Contradomínio", directive: "Para ser uma função de A em B, todo elemento de A deve ter uma imagem em B.", slotsCount: 3, correctSequence: ["forall", "x_in_A", "exists_y_in_B"], availableRunes: [{ id: "forall", symbol: "\\forall" }, { id: "x_in_A", symbol: "x \\in A" }, { id: "exists_y_in_B", symbol: "\\exists y \\in B" }, { id: "x_in_B", symbol: "x \\in B" }, { id: "implies", symbol: "\\implies" }], wisdomText: "Correto! O Domínio exige que TODO elemento (\\forall) do conjunto de partida (A) tenha (\\exists) um correspondente no conjunto de chegada (B)."
        } as DefinitionPuzzle,
        {
          id: "3.1.2", puzzleType: "Definition", title: "A Imagem de um Elemento", directive: "Defina que 'y' é a imagem de 'x' pela função 'f'.", slotsCount: 3, correctSequence: ["y", "eq", "fx"], availableRunes: [{ id: "y", symbol: "y" }, { id: "eq", symbol: "=" }, { id: "fx", symbol: "f(x)" }, { id: "x", symbol: "x" }], wisdomText: "Exato! A notação y = f(x) significa que a função f transforma a entrada x na saída y."
        } as DefinitionPuzzle,
        {
          id: "3.1.3", puzzleType: "Definition", title: "Imagem de um Subconjunto X", directive: "Forje f[X], que é o conjunto de todas as imagens f(x) onde x pertence a X.", slotsCount: 3, correctSequence: ["fX", "eq_set", "fx_x_in_X"], availableRunes: [{ id: "fX", symbol: "f[X]" }, { id: "eq_set", symbol: "=" }, { id: "fx_x_in_X", symbol: "\\{ f(x) \\mid x \\in X \\}" }, { id: "x_fx_in_X", symbol: "\\{ x \\mid f(x) \\in X \\}" }], wisdomText: "Perfeito! A imagem do conjunto X é a coleção de todos os resultados da função quando a alimentamos com os elementos de X."
        } as DefinitionPuzzle,
        {
          id: "3.1.4", puzzleType: "Definition", title: "Pré-imagem de um Subconjunto Y", directive: "Forje f⁻¹[Y], o conjunto de todos os x em A cujas imagens caem dentro de Y.", slotsCount: 3, correctSequence: ["f_inv_Y", "eq_set", "x_in_A_fx_in_Y"], availableRunes: [{ id: "f_inv_Y", symbol: "f^{-1}[Y]" }, { id: "eq_set", symbol: "=" }, { id: "x_in_A_fx_in_Y", symbol: "\\{ x \\in A \\mid f(x) \\in Y \\}" }, { id: "y_in_B", symbol: "\\{ y \\in B \\mid f(y) \\in Y \\}" }], wisdomText: "Muito bem! A pré-imagem 'olha para trás', buscando no Domínio (A) quem são os responsáveis por gerar os valores que estão no subconjunto Y."
        } as DefinitionPuzzle,
        {
          id: "3.1.5", puzzleType: "Definition", title: "O Escudo da Injetividade", directive: "Uma função é injetora se elementos diferentes têm imagens diferentes. Ou equivalentemente, imagens iguais implicam origens iguais.", slotsCount: 5, correctSequence: ["forall", "x1_x2_in_A", "fx1_eq_fx2", "implies", "x1_eq_x2"], availableRunes: [{ id: "forall", symbol: "\\forall" }, { id: "x1_x2_in_A", symbol: "x_1, x_2 \\in A" }, { id: "fx1_eq_fx2", symbol: "f(x_1) = f(x_2)" }, { id: "implies", symbol: "\\implies" }, { id: "x1_eq_x2", symbol: "x_1 = x_2" }, { id: "exists", symbol: "\\exists" }], wisdomText: "Isso mesmo! A injetividade garante exclusividade: ninguém divide o mesmo resultado final."
        } as DefinitionPuzzle,
        {
          id: "3.1.6", puzzleType: "Definition", title: "A Capa da Sobrejetividade", directive: "Uma função é sobrejetora se TODO elemento do Contradomínio é imagem de ALGUM elemento do Domínio.", slotsCount: 4, correctSequence: ["forall_y_in_B", "exists_x_in_A", "tal_que", "fx_eq_y"], availableRunes: [{ id: "forall_y_in_B", symbol: "\\forall y \\in B" }, { id: "exists_x_in_A", symbol: "\\exists x \\in A" }, { id: "tal_que", symbol: "\\text{tal que}" }, { id: "fx_eq_y", symbol: "f(x) = y" }, { id: "forall_x_in_A", symbol: "\\forall x \\in A" }], wisdomText: "Correto! Na sobrejetividade, o Contradomínio inteiro é atingido pela função. Não sobram elementos 'sem par' em B."
        } as DefinitionPuzzle,
        {
          id: "3.1.7", puzzleType: "Definition", title: "A Coroa da Bijetividade", directive: "Uma função é bijetora se, e somente se, for Injetora E Sobrejetora.", slotsCount: 3, correctSequence: ["f_bijetora", "iff", "inj_and_sob"], availableRunes: [{ id: "f_bijetora", symbol: "f \\text{ é Bijetora}" }, { id: "iff", symbol: "\\iff" }, { id: "inj_and_sob", symbol: "f \\text{ é Inj.} \\land f \\text{ é Sob.}" }, { id: "inj_or_sob", symbol: "f \\text{ é Inj.} \\lor f \\text{ é Sob.}" }], wisdomText: "Perfeito! A Bijetividade é o emparelhamento perfeito (1 para 1) entre todos os elementos de A e todos os elementos de B."
        } as DefinitionPuzzle
      ]
    },
    {
      id: "3.2",
      title: "O Gerador de Sinais",
      description: "Exemplos Concretos de Funções usando Mapeamento Visual.",
      microPhases: [
        { id: "3.2.1", puzzleType: "GraphConnect", title: "Primeiro Contato", directive: "Ative o portal ligando o nó 1 de A ao nó 'a' de B.", sets: [setA, setB], mode: 'connect', initialEdges: [], expectedEdges: [{from: '1', to: 'a'}], validationRule: 'exact_edges', wisdomText: "Portal ativado! Você estabeleceu uma relação entre os conjuntos." } as GraphConnectPuzzle,
        { id: "3.2.2", puzzleType: "GraphConnect", title: "Ligar as Arestas", directive: "Conecte os cabos para definir f(1)=a, f(2)=b, f(3)=a.", sets: [setA, setB], mode: 'connect', initialEdges: [], expectedEdges: [{from: '1', to: 'a'}, {from: '2', to: 'b'}, {from: '3', to: 'a'}], validationRule: 'exact_edges', wisdomText: "Função mapeada visualmente!" } as GraphConnectPuzzle,
        { id: "3.2.3", puzzleType: "GraphConnect", title: "Selecionar Subconjuntos", directive: "Isole (selecione) os nós X={1,2} em A e Y={a,c} em B.", sets: [setA, setB], mode: 'select', initialEdges: [], expectedSelection: ['1', '2', 'a', 'c'], validationRule: 'exact_selection', wisdomText: "Subconjuntos isolados no radar." } as GraphConnectPuzzle,
        { id: "3.2.4", puzzleType: "GraphConnect", title: "Determinar Imagem e Pré-imagem", directive: "Dada a função f já mapeada, selecione a imagem de X={1,2} e a pré-imagem de Y={b,d}.", sets: [setA, setB], mode: 'select', initialEdges: [{from:'1',to:'a'}, {from:'2',to:'b'}, {from:'3',to:'b'}], expectedSelection: ['a', 'b', '2', '3'], validationRule: 'exact_selection', wisdomText: "Mapeamento bidirecional confirmado!" } as GraphConnectPuzzle,
      ]
    },
    {
      id: "3.3",
      title: "Falhas e Contraexemplos Iniciais",
      description: "Derrube propriedades criando mapeamentos específicos.",
      microPhases: [
        { id: "3.3.1", puzzleType: "GraphConnect", title: "O Colapso (Falha Injetora)", directive: "Crie uma função válida f: A -> B, mas force uma falha injetora (dois elementos distintos do domínio apontam para o mesmo alvo).", sets: [setA, setB], mode: 'connect', initialEdges: [], validationRule: 'not_injective', wisdomText: "Injetividade quebrada! Ocorreu um colapso no sinal." } as GraphConnectPuzzle,
        { id: "3.3.2", puzzleType: "GraphConnect", title: "O Fio Desconectado (Falha Sobrejetora)", directive: "Crie uma função válida f: A -> B, mas deixe pelo menos um elemento do contradomínio sem pré-imagem conectada.", sets: [setA, setB], mode: 'connect', initialEdges: [], validationRule: 'not_surjective', wisdomText: "Sobrejetividade anulada! Há energia ociosa em B." } as GraphConnectPuzzle,
      ]
    },
    {
      id: "3.4",
      title: "Propriedades Gerais e Provas Formais",
      description: "Prove teoremas avançados usando a Forja de Provas.",
      microPhases: [
        { id: "3.4.1", puzzleType: "ProofBuilder", title: "Inclusão da Imagem da Pré-imagem", directive: "Prove que f[f⁻¹[Y]] ⊆ Y.", wisdomText: "Prova concluída com rigor matemático!" } as ProofBuilderPuzzle,
        { id: "3.4.2", puzzleType: "ProofBuilder", title: "Inclusão da Pré-imagem da Imagem", directive: "Prove que X ⊆ f⁻¹[f[X]].", wisdomText: "Demostração imbatível forjada!" } as ProofBuilderPuzzle,
        { id: "3.4.3", puzzleType: "GraphConnect", title: "Contraexemplo da Igualdade (Sobrejetividade)", directive: "Apresente um contraexemplo visual para f[f⁻¹[Y]] = Y criando uma função onde f[f⁻¹[B]] ≠ B (requer falha de sobrejetividade).", sets: [setA, setB], mode: 'connect', initialEdges: [], validationRule: 'not_surjective', wisdomText: "Falha explorada com sucesso!" } as GraphConnectPuzzle,
        { id: "3.4.4", puzzleType: "GraphConnect", title: "Contraexemplo da Igualdade (Injetividade)", directive: "Apresente um contraexemplo visual para X = f⁻¹[f[X]] criando uma função onde A ≠ f⁻¹[f[A]] (requer falha de injetividade).", sets: [setA, setB], mode: 'connect', initialEdges: [], validationRule: 'not_injective', wisdomText: "Contraexemplo incontestável construído!" } as GraphConnectPuzzle,
        { 
          id: "3.4.5", 
          puzzleType: "Definition", 
          title: "Trava de Igualdade 1", 
          directive: "Para garantir que f[f⁻¹[Y]] = Y, a função deve ser qualificada como...", 
          slotsCount: 1, 
          correctSequence: ["f_sobrejetora"], 
          availableRunes: [{ id: "f_sobrejetora", symbol: "\\text{Sobrejetora}" }, { id: "f_injetora", symbol: "\\text{Injetora}" }], 
          wisdomText: "Exatamente! Sem sobras no contradomínio, a volta garante alcançar tudo." 
        } as DefinitionPuzzle,
        { 
          id: "3.4.6", 
          puzzleType: "Definition", 
          title: "Trava de Igualdade 2", 
          directive: "Para garantir que X = f⁻¹[f[X]], a função deve ser qualificada como...", 
          slotsCount: 1, 
          correctSequence: ["f_injetora"], 
          availableRunes: [{ id: "f_injetora", symbol: "\\text{Injetora}" }, { id: "f_sobrejetora", symbol: "\\text{Sobrejetora}" }], 
          wisdomText: "Exatamente! Sem colisões na ida, o retorno te leva de volta aos exatos pontos de partida." 
        } as DefinitionPuzzle,
      ]
    },
    {
      id: "3.5",
      title: "Composição de Funções",
      description: "Portais Encadeados e Provas de Composição.",
      microPhases: [
        { 
          id: "3.5.1", 
          puzzleType: "Definition", 
          title: "Definindo a Composição", 
          directive: "Forje a notação de que y é o resultado da composição de f seguida de g aplicada em x.", 
          slotsCount: 3, 
          correctSequence: ["y", "eq", "g_f_x"], 
          availableRunes: [{ id: "y", symbol: "y" }, { id: "eq", symbol: "=" }, { id: "g_f_x", symbol: "(g \\circ f)(x)" }, { id: "f_g_x", symbol: "(f \\circ g)(x)" }], 
          wisdomText: "Atenção à ordem: g ∘ f significa que a função f é aplicada primeiro!" 
        } as DefinitionPuzzle,
        { id: "3.5.2", puzzleType: "ProofBuilder", title: "Composição Injetora", directive: "Prove que se g ∘ f é injetora, então f é obrigatoriamente injetora.", wisdomText: "Dedução impecável! Se não houver colisão no final, não pode ter havido no início." } as ProofBuilderPuzzle,
        { id: "3.5.3", puzzleType: "ProofBuilder", title: "Composição Sobrejetora", directive: "Prove que se g ∘ f é sobrejetora, então g é obrigatoriamente sobrejetora.", wisdomText: "Lógica irrefutável! O último passo da jornada precisa cobrir todo o destino." } as ProofBuilderPuzzle,
        { id: "3.5.4", puzzleType: "GraphConnect", title: "Refutando f(x) via Composição", directive: "Crie ligações para f (A->B) e g (B->C) de forma que g ∘ f seja injetora, mas g NÃO seja injetora.", sets: [setA, setB, setC], mode: 'connect', initialEdges: [], validationRule: 'composition_inj_not_inj', wisdomText: "Contraexemplo genial! O que acontece na camada de g que f não alcança não afeta a injetividade da composição." } as GraphConnectPuzzle,
        { id: "3.5.5", puzzleType: "GraphConnect", title: "Refutando g(x) via Composição", directive: "Crie ligações para f e g de forma que g ∘ f seja sobrejetora, mas f NÃO seja sobrejetora.", sets: [setA, setB, setC], mode: 'connect', initialEdges: [], validationRule: 'composition_surj_not_surj', wisdomText: "Isso mesmo! 'f' não precisa cobrir todo o conjunto intermediário para que 'g' alcance o destino final inteiro." } as GraphConnectPuzzle,
      ]
    }
  ]
};
