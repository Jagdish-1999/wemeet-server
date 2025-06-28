import express, { Request, Response, NextFunction } from "express";

// Error-handling middleware
export function errorHandler(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.error(err); // Log the error
    res.status(500).json({ message: "Internal Server Error" }); // Send an appropriate response
}
