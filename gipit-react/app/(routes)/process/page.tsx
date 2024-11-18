import { fetchProcess } from "@/app/actions/fakeApi";
import DataGrid from "@/components/molecules/DataGrid";
import SearchBar from "@/components/molecules/SearchBar";

interface Process {
  id: number;
  name: string;
  stage: string;
  startAt: string;
  endAt: string | null;
  preFiltered: number;
  candidates: number;
  state: string;
}

interface Column<T> {
  name: string;
  key: keyof T; // Clave que referencia la propiedad del objeto T
  width: number; // Ancho de la columna
}

interface ResponseData<T> {
  total: number;
  columns: Column<T>[];
  batch: T[];
}

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  //const query = searchParams?.query || "";
  const page = searchParams?.page ? parseInt(searchParams?.page) : 1;
  const process = await fetchProcess(page);

  const data: ResponseData<Process> = {
    columns: [
      { name: "Nombre", key: "name", width: 2 },
      { name: "Etapa", key: "stage", width: 1.2 },
      { name: "Inicio", key: "startAt", width: 1 },
      { name: "Cierre", key: "endAt", width: 1 },
      { name: "Pre Filtrados", key: "preFiltered", width: 0.6 },
      { name: "Candidatos", key: "candidates", width: 0.6 },
      { name: "Estado", key: "state", width: 0.6 },
    ],
    total: process.total,
    batch: process.batch,
  };

  return (
    <div className="inner-page-container">
      <SearchBar buttonLink="/process/new-process" buttonText="Nuevo Proceso" />
      <DataGrid data={data} baseUrl="/process" />
    </div>
  );
}