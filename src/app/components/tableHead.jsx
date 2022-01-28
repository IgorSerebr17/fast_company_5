import React, { useState } from "react";
import PropTypes from "prop-types";
import ArrowUp from "../../img/caret-up.svg";
import ArrowDown from "../../img/caret-down.svg";

const TableHead = ({ onSort, selectedSort, columns }) => {
    const [keyElem, setKeyElem] = useState(null);

    const handleSort = (sortedName) => {
        if (selectedSort.path === sortedName) {
            onSort({
                ...selectedSort,
                order: selectedSort.order === "asc" ? "desc" : "asc"
            });
        } else {
            onSort({ path: sortedName, order: "asc" });
        }
    };

    const handleMouse = (item) => {
        console.log("handleMouse = ", item);
        setKeyElem(item);
        console.log("keyElem = ", keyElem);
    };

    return (
        <thead>
            <tr>
                {Object.keys(columns).map((column) => (
                    <th
                        key={column}
                        onClick={() =>
                            columns[column].path
                                ? handleSort(columns[column].path)
                                : undefined
                        }
                        onMouseEnter={(ev) => handleMouse(ev._targetInst.key)}
                        scope="col"
                        role={columns[column].path && "button"}
                    >
                        {columns[column].name}
                        {keyElem === column && columns[column].path
                            ? (selectedSort.order === "asc"
                                ? (<img src={ArrowUp} alt="arrow" />)
                                : (<img src={ArrowDown} alt="arrow" />))
                            : undefined}
                    </th>
                ))}
            </tr>
        </thead>
    );
};

TableHead.propTypes = {
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    columns: PropTypes.object.isRequired
};

export default TableHead;
