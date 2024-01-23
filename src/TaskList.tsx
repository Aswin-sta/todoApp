import React, { useEffect, useState } from "react";
import { tasksData } from "./constants/tasks";
import Task from "./Task";
import { TaskComponentPropType, TaskPropType } from "./pages/types";
import { Card, Container } from "react-bootstrap";

const TaskList = () => {
  const [tasks, setTasks] = useState<TaskPropType[]>(
    tasksData as TaskPropType[]
  );
  const [filteredTasks, setfilteredTasks] = useState(tasksData);
  const changeStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
    let taskId: number = parseInt(e.target.value);
    let filtererdTask = tasksData.filter((task) => task.id === taskId);
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
      setfilteredTasks(tasksData);
    } else {
      let filtered = tasks.filter((task) => task.status === e.target.value);

      setfilteredTasks(filtered);
    }
  };

  useEffect(() => {
    console.log("mounted");

    return () => {
      console.log("unmounted");
    };
  }, [filteredTasks]);

  return (
    <Card>
      <Card.Header>
        Tasks for the day
        <select className="m-3" onChange={filterFunction} defaultValue={"all"}>
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
      </Card.Footer>
    </Card>
  );
};

export default TaskList;
