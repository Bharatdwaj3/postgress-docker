import prisma from "../config/prisma-client.ts";
import type {
  bookCreateInput,
  bookModel,
  bookUpdateInput,
} from "../generated/prisma/models/book.ts";
import type { Response, Request } from "express";

const listBooks = async (
  req: Request,
  res: Response<any, bookModel[]>
): Promise<void> => {
  try {
    const books = await prisma.book.findMany();
    res.status(200).json(books);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "An error occurred";
    res.status(500).json({ message });
  }
};

const getBook = async (
  req: Request<{ id: string }>,
  res: Response<bookModel | null | { message: string }>
): Promise<void> => {
  try {
    const book = await prisma.book.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(200).json(book);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "An error occurred";
    res.status(500).json({ message });
  }
};

const registerBook = async (
  req: Request<{}, {}, bookCreateInput>,
  res: Response<bookModel | null | { message: string }>
): Promise<void> => {
  try {
    const book = await prisma.book.create({
      data: {
        name: req.body.name,
        publisher: req.body.publisher,
        writer: req.body.writer,
        genre: req.body.genre,
      },
    });
    res.status(201).json(book);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "An error occurred";
    res.status(500).json({ message });
  }
};

const updateBook = async (
  req: Request<{ id: string }, {}, bookUpdateInput>,
  res: Response<bookModel | null | { message: string }>
): Promise<void> => {
  try {
    const book = await prisma.book.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        name: req.body.name,
        publisher: req.body.publisher,
        writer: req.body.writer,
        genre: req.body.genre,
      },
    });
    res.status(200).json(book);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "An error occurred";
    res.status(500).json({ message });
  }
};

const removeBook = async (
  req: Request<{ id: string }, {}, bookModel>,
  res: Response<bookModel | null | { message: string }>
): Promise<void> => {
  try {
    const book = await prisma.book.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(200).json(book);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "An error occurred";
    res.status(500).json({ message });
  }
};

export { listBooks, getBook, registerBook, updateBook, removeBook };
