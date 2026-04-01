export interface Legislacao {
  id: string;
  identificador: string;
  tipo: "Lei" | "Decreto" | "Portaria";
  titulo: string;
  dataPublicacao: string;
  exercicio: number;
  pdfUrl?: string;
}

export const LEGISLACAO_MOCK: Legislacao[] = [
  // Decretos 2026
  {
    id: "dec-4-2026",
    identificador: "04/2026",
    tipo: "Decreto",
    titulo: "Declara Situação de Emergência nas áreas do município afetadas por chuvas intensas (COBRADE 1.3.2.1.4).",
    dataPublicacao: "2026-03-05",
    exercicio: 2026
  },
  {
    id: "dec-3-2026",
    identificador: "03/2026",
    tipo: "Decreto",
    titulo: "Declara estado de Calamidade Pública em virtude da crise financeira que atravessa o município.",
    dataPublicacao: "2026-03-04",
    exercicio: 2026
  },
  {
    id: "dec-2-2026",
    identificador: "02/2026",
    tipo: "Decreto",
    titulo: "Declara “Situação de Emergência, de Nível II” nas áreas do município afetadas pelo desastre Seca (COBRADE 1.4.1.2.0).",
    dataPublicacao: "2026-03-04",
    exercicio: 2026
  },
  
  // Leis 2026
  {
    id: "lei-439-2026",
    identificador: "439/2026",
    tipo: "Lei",
    titulo: "Dispõe sobre a criação da gratificação denominada função gratificada – FG para os servidores ocupantes do cargo de provimento efetivo de Agente de Controle Interno.",
    dataPublicacao: "2026-03-30",
    exercicio: 2026
  },
  {
    id: "lei-437-2026",
    identificador: "437/2026",
    tipo: "Lei",
    titulo: "Dispõe sobre a alteração do Parágrafo Segundo e Parágrafo Terceiro do art. 105 da Lei Municipal n.º 072/1997.",
    dataPublicacao: "2026-02-25",
    exercicio: 2026
  },
  {
    id: "lei-436-2026",
    identificador: "436/2026",
    tipo: "Lei",
    titulo: "Dispõe sobre a alteração do anexo da Lei Municipal n.º 290, de 26 de junho de 2017.",
    dataPublicacao: "2026-02-25",
    exercicio: 2026
  },

  // Portarias 2026
  {
    id: "por-084-2026",
    identificador: "084/2026",
    tipo: "Portaria",
    titulo: "Dispõe sobre Progressão Horizontal de Professor(a) da rede municipal de ensino.",
    dataPublicacao: "2026-03-01",
    exercicio: 2026
  },
  {
    id: "por-083-2026",
    identificador: "083/2026",
    tipo: "Portaria",
    titulo: "Dispõe sobre Progressão Horizontal de Professor(a) da rede municipal de ensino.",
    dataPublicacao: "2026-03-01",
    exercicio: 2026
  },
  {
    id: "por-082-2026",
    identificador: "082/2026",
    tipo: "Portaria",
    titulo: "Dispõe sobre Progressão Horizontal de Professor(a) da rede municipal de ensino.",
    dataPublicacao: "2026-03-01",
    exercicio: 2026
  }
];
