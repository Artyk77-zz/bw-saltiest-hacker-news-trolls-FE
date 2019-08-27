import React, { useState, useEffect } from "react";
import axios from "axios";
import UserCard from "./userCard";
import { Card } from "semantic-ui-react";
import Pagination from "../common/Pagination";
import "./user.scss";

const UserList = props => {
  // console.log("props in UserList", props);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .post("https://cors-anywhere.herokuapp.com/http://hackernews-serving.herokuapp.com/salt", {})
      .then(response => {
        let json = JSON.parse(response.data)
        // console.log('JSON', json)
        let sorted = json.sort((a, b) => {
          return a.ranking - b.ranking
        })
        setUsers(sorted)
      });
  }, []);

  // return paginated .map over list of users, rendering a UserCard for each
  return (
    <Card.Group className="cardGroup" itemsPerRow="1">
      {users !== [] ? (
        <Pagination
          dataArray={users}
          render={function paginatedData(props) {
            return (
              <>
                {props.handleShowCount(10)}
                {props.paginatedData.map(function renderPaginatedData(data) {
                  return <UserCard user={data} />;
                })}
              </>
            );
          }}
        />
      ) : (
        <h1>Users not found</h1>
      )}
      {/* {uses.map(user => {
        return <UserCard user={user} props={props} />;
      })} */}
    </Card.Group>
  );
};

export default UserList;
