export const Table = ({ columns, data, className }) => {
    return (
        <div className={`overflow-x-auto ${className}`}>
            <table className="w-full">
                <thead>
                    <tr className="border-b">
                        {columns.map(col => (
                            <th key={col.accessor} className="text-left p-3 bg-gray-50">
                                {col.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, idx) => (
                        <tr key={idx} className="hover:bg-gray-50">
                            {columns.map(col => (
                                <td key={col.accessor} className="p-3">
                                    {row[col.accessor]}
                                </td>
                            ))}
                        </tr>
                    )
                )}
                </tbody>
            </table>
        </div>    
        )
}