import express, { Request, Response, NextFunction } from "express";

// Error-handling middleware
export function errorHandler(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.error(`%c[Error] middleware: `, "color:red;font-weight:bold;", err);
    res.status(500).json({ message: "Internal Server Error" });
}
