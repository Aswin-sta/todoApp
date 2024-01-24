import React from "react";
import { TaskComponentPropType } from "./pages/types";
import { Card, Form } from "react-bootstrap";

const Task = ({ task, changeStatus }: TaskComponentPropType) => {
  return (
    <div>
      <Card className="m-3 p-4 ">
        <Form>
          <Form.Check
            label={task.title}
            checked={task.status === "complete" ? true : false}
            onChange={changeStatus}
            value={task.id}
          ></Form.Check>
        </Form>
      </Card>
    </div>
  );
};

export default Task;
