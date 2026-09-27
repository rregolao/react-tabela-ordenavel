const colunas = [
  { key: "nome", label: "Nome" },
  { key: "idade", label: "Idade" },
  { key: "cargo", label: "Cargo" },
];

const TableHeader = ({ onColumnClick, sortConfig }) => {
  const handleKeyDown = (e, key) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onColumnClick(key);
    }
  };

  return (
    <thead>
      <tr>
        {colunas.map(({ key, label }) => {
          const isSorted = sortConfig?.key === key;
          const seta = isSorted
            ? sortConfig.direction === "ascending"
              ? " ▲"
              : " ▼"
            : "";
          return (
            <th
              key={key}
              onClick={() => onColumnClick(key)}
              onKeyDown={(e) => handleKeyDown(e, key)}
              tabIndex={0}
              role="columnheader button"
              aria-sort={
                isSorted
                  ? sortConfig.direction === "ascending"
                    ? "ascending"
                    : "descending"
                  : "none"
              }
            >
              {label}
              {seta}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default TableHeader;
