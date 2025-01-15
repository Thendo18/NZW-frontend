const Table = ({ headers, data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full border-collapse border border-gray-300">
        {/* #region Table Head */}
        <thead className="bg-gray-200">
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className="border border-gray-300 px-4 py-2 text-left"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        {/* #endregion */}

        {/* #region Table Body */}
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={rowIndex % 2 === 0 ? "bg-gray-100" : "bg-white"}
            >
              {Object.values(row).map((value, cellIndex) => (
                <td
                  key={cellIndex}
                  className="border border-gray-300 px-4 py-2"
                >
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        {/* #endregion */}
      </table>
    </div>
  );
};



export default Table;
