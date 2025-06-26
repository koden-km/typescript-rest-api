import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { User } from "./models";
import {
  HTTP_200_OK,
  HTTP_201_CREATED,
  HTTP_204_NO_CONTENT,
  HTTP_400_BAD_REQUEST,
  HTTP_404_NOT_FOUND,
} from "../http-status";

// NOTE: In a real application, this would interact with a database.
let users: User[] = [
  { id: "1", name: "Alice", email: "alice@example.com" },
  { id: "2", name: "Bob", email: "bob@example.com" },
];

let nextUserId = users.length + 1;

// Get all users
export function getAllUsers(req: Request, res: Response): void {
  res.status(HTTP_200_OK).json(users);
}

// Get a single user by ID
export function getUserById(req: Request, res: Response): void {
  const { id } = req.params;
  const user = users.find((u) => u.id === id);
  if (user) {
    res.status(HTTP_200_OK).json(user);
  } else {
    res.status(HTTP_404_NOT_FOUND).json({ message: "User not found" });
    return;
  }
}

// Create a new user
export function createUser(req: Request, res: Response): void {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(HTTP_400_BAD_REQUEST).json({ errors: errors.array() });
    return;
  }
  const { name, email } = req.body;
  const newUser: User = {
    id: getNextId(),
    name,
    email,
  };
  users.push(newUser);
  res.status(HTTP_201_CREATED).json(newUser);
}

// Update an existing user
export function updateUser(req: Request, res: Response): void {
  const { id } = req.params;
  const userIndex = users.findIndex((u) => u.id === id);
  if (userIndex === -1) {
    res.status(HTTP_404_NOT_FOUND).json({ message: "User not found" });
    return;
  }
  const updatedData: Partial<User> = req.body; // Allow partial updates
  users[userIndex] = { ...users[userIndex], ...updatedData };
  res.status(HTTP_200_OK).json(users[userIndex]);
}

// Delete a user
export function deleteUser(req: Request, res: Response): void {
  const { id } = req.params;
  const initialLength = users.length;
  users = users.filter((u) => u.id !== id);
  if (users.length < initialLength) {
    res.status(HTTP_204_NO_CONTENT).send(); // No content for successful deletion
  } else {
    res.status(HTTP_404_NOT_FOUND).json({ message: "User not found" });
  }
}

// Simple ID generation
function getNextId(): string {
  return String(nextUserId++);
}
