import React, { useState, useEffect } from "react";
import SearchStatus from "./searchStatus";
import UsersTable from "./usersTable";
import Pagination from "./pagination";
import paginate from "../utils/paginate";
import GroupList from "./groupList";
import _ from "lodash";
import API from "../api";

const Users = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });

    const [users, setUsers] = useState();

    useEffect(() => {
        API.users.fetchAll().then((data) => setUsers(data));
    }, []);

    useEffect(() => {
        API.professions.fetchProfessions().then((data) =>
            setProfessions(
                Object.assign(data, {
                    allProfessions: { _id: "", name: "Все профессии" }
                })
            )
        );
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };
    const handleToggleBookMark = (id) => {
        setUsers(
            users.map((user) => {
                if (user._id === id) {
                    return { ...user, bookmark: !user.bookmark };
                }
                return user;
            })
        );
    };

    const pageSize = 12;

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    if (users) {
        const filteredUsers = selectedProf
            ? users.filter((user) => user.profession._id === selectedProf)
            : users;

        const usersCount = filteredUsers.length;

        const handleSort = (sortedParam) => {
            setSortBy(sortedParam);
        };

        const sortedUsers = _.orderBy(
            filteredUsers,
            [sortBy.path],
            [sortBy.order]
        );

        const currentPageUsers = paginate(sortedUsers, currentPage, pageSize);

        const handleItemSelect = (profession) => {
            setSelectedProf(profession._id);
        };

        return (
            <div className="d-flex">
                {professions && (
                    <div className="d-flex flex-column flex-shrink-0 p-3">
                        <GroupList
                            items={professions}
                            onItemSelect={handleItemSelect}
                            selectedItem={selectedProf}
                        />
                    </div>
                )}
                <div className="d-flex flex-column">
                    <SearchStatus length={usersCount} />
                    {usersCount > 0 && (
                        <UsersTable
                            currentPageUsers={currentPageUsers}
                            onSort={handleSort}
                            selectedSort={sortBy}
                            onDelete={handleDelete}
                            onToggleBookMark={handleToggleBookMark}
                        />
                    )}
                    <Pagination
                        itemsCount={usersCount}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageCange={handlePageChange}
                    />
                </div>
            </div>
        );
    }
    return "...loading";
};

export default Users;
