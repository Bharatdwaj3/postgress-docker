import prisma from "../config/prisma";
import type {bookCreateInput, bookModel, bookUpdateInput } from "../generated/prisma/models/book" 
import type { Response, Request } from 'express';

const listBooks= async (req: Request, res: Response<any, bookModel[]>):Promise<void> => {
  try {
    const books = await prisma.book.findMany();
    res.status(200).json(books);
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
}

const getBook= async (req: Request<{id:string}>, res: Response<bookModel | null>): Promise<void> => {
  try {
    const book = await prisma.book.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const registerBook =async (req: Request<{}, {},bookCreateInput>, res:Response<bookModel|null>):Promise<void> => {
  try {
    const book = await prisma.book.create({
      data: {
        name: req.body.name,
        publisher: req.body.publisher,
        writer: req.body.writer,
        genre: req.body.genre
      },
    });
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const updateBook=async (req:Request<{id: string},{},bookUpdateInput>, res:Response<bookModel>):Promise<void> => {
  try {
    const book = await prisma.book.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        name: req.body.name,
        publisher: req.body.publisher,
        writer: req.body.writer,
        genre: req.body.genre
      },
    });
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const removeBook = async (req:Request<{id: string},{},bookModel>, res:Response<bookModel>):Promise<void> => {
  try {
    const book = await prisma.book.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  listBooks,
  getBook,
  registerBook,
  updateBook,
  removeBook,
};