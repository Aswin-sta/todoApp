import React, { useEffect, useState } from "react";
import Task from "./Task";
import { TaskComponentPropType, TaskPropType } from "./pages/types";
import { Card, Container, Pagination } from "react-bootstrap";
import axios from "axios";

const TaskList = () => {
  const [tasks, setTasks] = useState<TaskPropType[]>([]);
  const [filter, setFilter] = useState<String>("all");
  const [filteredTasks, setfilteredTasks] = useState<TaskPropType[]>(tasks);
  const [offset, setOffset] = useState<number>(10);

  const changeStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
    let taskId: number = parseInt(e.target.value);
    let filtererdTask = tasks.filter((task) => task.id === taskId);
    filtererdTask[0].status = e.target.checked ? "complete" : "incomplete";

    setTasks((prev) => {
      let toReplaceData = prev.filter(
        (data) => data.id === filtererdTask[0].id
      );
      let toReplaceIndex = prev.indexOf(toReplaceData[0]);
      prev.splice(toReplaceIndex, 1, filtererdTask[0]);
      return [...prev];
    });
  };

  const filterFunction = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!e.target.value || e.target.value === "all") {
      setfilteredTasks(tasks);
    } else {
      let filtered = tasks.filter((task) => task.status === e.target.value);

      setfilteredTasks(filtered);
    }
  };

  const apicall = async () => {
    let response: TaskPropType[] | void = await axios
      .get(
        `https://0bd67426-e6a8-49b3-8e59-a5524e33ecf7.mock.pstmn.io/task/offset=${offset}`
      )
      .then((data) => {
        setTasks(data.data as TaskPropType[]);
        setfilteredTasks(data.data as TaskPropType[]);
      });
    console.log(response);
  };

  useEffect(() => {
    apicall();
  }, []);

  useEffect(() => {
    if (filter !== "all") {
      setfilteredTasks((prev) => prev.filter((task) => task.status === filter));
    }
  }, [tasks, filter]);

  function setPrev(): void {
    setOffset((prev) => prev - 10);
  }
  function setNext(): void {
    setOffset((prev) => prev + 10);
  }

  useEffect(() => {
    apicall();
  }, [offset]);

  return (
    <Card>
      <Card.Header>
        Tasks for the day
        <select
          className="m-3"
          onChange={(e) => {
            filterFunction(e);
            setFilter(e.target.value);
          }}
          defaultValue={"all"}
        >
          <option value={"all"}>All</option>
          <option value={"complete"}>complete</option>
          <option value={"incomplete"}>incomplete</option>
        </select>
      </Card.Header>
      <Card.Body>
        {filteredTasks.map((task) => (
          <Task key={task.id} task={task} changeStatus={changeStatus} />
        ))}
      </Card.Body>
      <Card.Footer>
        woohoo you have reached the end, now start working
        <Pagination>
          <Pagination.Prev onClick={setPrev}></Pagination.Prev>
          <Pagination.Next onClick={setNext}></Pagination.Next>
        </Pagination>
      </Card.Footer>
    </Card>
  );
};

export default TaskList;
