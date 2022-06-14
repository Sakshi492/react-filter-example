import { useEffect, useState } from "react";
import "./styles/search.scss";

function Search() {
  const [userList, updateUserList] = useState([]);
  const [listState, setListState] = useState({});
  const [data, updateData] = useState("");

  const filterList = (list) => {
    const filteredlist = list.filter(
      (element) =>
        element.name.toLowerCase().includes(data.toLowerCase()) ||
        element.email.toLowerCase().includes(data.toLowerCase())
    );
    return filteredlist;
  };

  const keyEnter = (event) => {
    updateData(event.target.value);
  };

  const fetchData = async () => {
    const data = await fetch("https://jsonplaceholder.typicode.com/users");
    const list = await data.json();
    updateUserList(list);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toggleDetails = (id) => {
    const listStateCp = { ...listState };
    if (listStateCp[id]) {
      delete listStateCp[id];
    } else {
      listStateCp[id] = true;
    }
    setListState(listStateCp);
  };

  const userListElem =
    userList.length === 0
      ? []
      : filterList(userList).map((user) => {
          return (
            <div
              className={`user-ctr ${listState[user.id] ? "collapse" : ""}`}
              key={user.id}
              onClick={() => toggleDetails(user.id)}
            >
              <div className="user-head">
                <div className="user-head-name">{` ${user.id}. ${user.name} `}</div>
                {listState[user.id] && (
                  <div className="user-head-email">{`@${user.email}`}</div>
                )}
              </div>
              {!listState[user.id] && (
                <div className="user-details">
                  <div className="user-email">Email : {user.email}</div>
                  <div className="user-phone">Phone : {user.phone}</div>
                  <div className="user-website">Website : {user.website}</div>
                </div>
              )}
            </div>
          );
        });

  return (
    <div className="search-ctr">
      <div className="search-head">User's List</div>
      <input
        className="search-input"
        placeholder="Search by user name or email"
        value={data}
        onKeyUp={(event) => keyEnter(event)}
        onChange={(event) => keyEnter(event)}
      ></input>
      <div className="users-list"> {userListElem}</div>
    </div>
  );
}

export default Search;
