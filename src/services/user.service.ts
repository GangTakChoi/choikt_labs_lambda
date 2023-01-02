import {
  PutCommand,
  GetCommand,
  ScanCommand,
  DeleteCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import User from "../interfaces/user.model";
import { ddbDocClient } from "../lib/ddbDocClient";

export default class UserService {
  constructor() {}

  async update(id: any, name: any, age: any) {
    const params = {
      TableName: "user",
      Key: {
        id,
      },
      ProjectionExpression: "id, age, #n",
      ExpressionAttributeNames: { "#n": "name" },
      UpdateExpression: "set #n = :name, age = :age",
      ExpressionAttributeValues: {
        ":name": name,
        ":age": age,
      },
    };
    try {
      const data = await ddbDocClient.send(new UpdateCommand(params));
      console.log("Success - item added or updated", data);
      return data;
    } catch (err) {
      console.log("Error", err);
      return null;
    }
  }

  async delete(id: any) {
    const params = {
      TableName: "user",
      Key: {
        id,
      },
    };
    try {
      const result = await ddbDocClient.send(new DeleteCommand(params));
      return result;
    } catch (err) {
      console.log("Error", err);
      return null;
    }
  }

  async find() {
    const params = {
      TableName: "user",
      ProjectionExpression: "id, age, #n",
      ExpressionAttributeNames: { "#n": "name" },
      //   FilterExpression: "#n = :name",
      //   ExpressionAttributeValues: {
      //     ":name": "choikt3",
      //   },
    };

    const data = await ddbDocClient.send(new ScanCommand(params));
    return data.Items;
  }

  async findOne(id: any) {
    const params = {
      TableName: "user",
      Key: {
        id: id,
      },
    };

    const data = await ddbDocClient.send(new GetCommand(params));

    return data.Item;
  }

  async create(userForm: User) {
    // Set the parameters.
    const params = {
      TableName: "user",
      Item: userForm,
    };
    try {
      const data = await ddbDocClient.send(new PutCommand(params));
      return data;
    } catch (err: any) {
      console.log("Error", err.stack);
      return null;
    }
  }
}
