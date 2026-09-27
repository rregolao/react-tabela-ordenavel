import { useState } from "react";
import SearchBar from "./components/SearchBar";
import TableHeader from "./components/TableHeader";
import TableRow from "./components/TableRow";

const TableSortable = () => {
  // Esta tabela é somente leitura por enquanto (não há como adicionar,
  // editar ou remover linhas), então não precisamos de um setter aqui.
  const [data] = useState([
    { nome: "Ana", idade: 25, cargo: "Engenheira" },
    { nome: "João", idade: 30, cargo: "Desenvolvedor" },
    { nome: "Maria", idade: 22, cargo: "Designer" },
    { nome: "Carlos", idade: 40, cargo: "Gerente" },
    { nome: "Sofia", idade: 28, cargo: "Analista" },
  ]);

  const [sortConfig, setSortConfig] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");


  const sortedData = [...data].sort((a, b) => {
    if (sortConfig !== null) {
      if (typeof a[sortConfig.key] === "number") {
        // Se for número
        return sortConfig.direction === "ascending"
          ? a[sortConfig.key] - b[sortConfig.key]
          : b[sortConfig.key] - a[sortConfig.key];
      } else {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
      }
    }
    return 0;
  });

  const termoBusca = searchTerm.toLowerCase();
  const filteredData = sortedData.filter(
    (row) =>
      row.nome.toLowerCase().includes(termoBusca) ||
      row.cargo.toLowerCase().includes(termoBusca) ||
      String(row.idade).includes(termoBusca)
  );

  const onColumnClick = (key) => {
    let direction = "ascending";

    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }

    setSortConfig({ key, direction });
  };

  return (
    <div className="container">
      <h1>Tabela de usuários</h1>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <table>
        <TableHeader onColumnClick={onColumnClick} sortConfig={sortConfig} />
        <tbody>
          {filteredData.map((row) => (
            <TableRow key={row.nome} row={row} />
          ))}
        </tbody>
      </table>
      {filteredData.length === 0 && (
        <p className="sem-resultados">Nenhum resultado encontrado.</p>
      )}
    </div>
  );
};

export default TableSortable;
