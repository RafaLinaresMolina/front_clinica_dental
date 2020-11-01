import React from "react";
import { useTable, useSortBy } from "react-table";
import "./GenericReactTable.scss";

const getStyle = (status, date) => {
  const values = {
    0: "trCancell",
    1: "trPending",
    2: "trAccepted",
    3: "trDone",
    4: "trDefault"
  };  

  if(([1,2].includes(status)) && (new Date(date) < new Date())){
    return "trPastDue"
  }
  return values[status] ? values[status] : 'trDefault';
};

function GenericReactTable(props) {
  const data = React.useMemo(() => props.data, [props.data]);
  const columns = React.useMemo(() => props.columns, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data }, useSortBy );

  return (
    <div className="tableAppointment">
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
     
                >
                  {column.render("Header")}
                  <span>
              {column.isSorted ? (column.isSortedDesc 
                ? <span role="img" aria-label="down arrow">{" "}&#128317;</span> :
               <span role="img" aria-label="up arrow">{" "}&#128316;</span>) : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            
            prepareRow(row);
            return (
              
              <tr {...row.getRowProps()} className={!props.defaultStyle ? getStyle(row.original.status, row.original.date) : "trDefault"}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
              
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
export default GenericReactTable;
