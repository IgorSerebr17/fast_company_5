import React from "react";
import TableHead from "./tableHead";
import TableBody from "./tableBody";
import PropTypes from "prop-types";

const Table = ({ selectedSort, columns, onSort, data, children }) => {
    return (
        <table className="table">
            {children || (
                <>
                    <TableHead {...{ selectedSort, columns, onSort }} />
                    <TableBody {...{ columns, data }} />
                </>
            )}
        </table>
    );
};

Table.propTypes = {
    selectedSort: PropTypes.object,
    columns: PropTypes.object,
    onSort: PropTypes.func,
    data: PropTypes.array,
    children: PropTypes.array
};

export default Table;
