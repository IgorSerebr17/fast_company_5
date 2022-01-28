import React from "react";

import QualitiesList from "./qualitiesList";
import BookMark from "./bookmark";
import Table from "./table";
import PropTypes from "prop-types";

const UsersTable = ({
    currentPageUsers,
    onSort,
    selectedSort,
    onToggleBookMark,
    onDelete
}) => {
    const columns = {
        name: { path: "name", name: "Имя" },
        qualities: {
            name: "Качества",
            component: (user) => <QualitiesList qualities={user.qualities} />
        },
        professions: { path: "profession.name", name: "Профессия" },
        completedMeetings: { path: "completedMeetings", name: "Число встреч" },
        rate: { path: "rate", name: "Оценка" },
        bookmark: {
            path: "bookmark",
            name: "Избранное",
            component: (user) => (
                <BookMark
                    status={user.bookmark}
                    onClick={() => onToggleBookMark(user._id)}
                />
            )
        },
        delete: {
            component: (user) => (
                <button
                    onClick={() => onDelete(user._id)}
                    className="btn btn-danger"
                >
                    delete
                </button>
            )
        }
    };

    return (
        // <Table {...{ selectedSort, columns, onSort, data: currentPageUsers }}>
        //     <TableHead {...{ selectedSort, columns, onSort }} />
        //     <TableBody {...{ columns, data: currentPageUsers }} />
        // </Table>
        <Table {...{ selectedSort, columns, onSort, data: currentPageUsers }} />
    );
};

UsersTable.propTypes = {
    currentPageUsers: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    onToggleBookMark: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default UsersTable;
