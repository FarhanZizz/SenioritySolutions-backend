import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";

import { PrismaClient } from "@prisma/client";
import cookieParser from "cookie-parser";
import { UserRoutes } from "./modules/user/user.routes";
import { serviceRoutes } from "./modules/service/service.routes";
import { bookingRoutes } from "./modules/booking/booking.routes";
import { ContentRoutes } from "./modules/content/content.routes";

const app: Application = express();
export const prisma = new PrismaClient();

app.use(cors());
app.use(cookieParser());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", UserRoutes);
app.use("/api/v1", serviceRoutes);
app.use("/api/v1", bookingRoutes);
app.use("/api/v1", ContentRoutes);

//global error handler
app.use(globalErrorHandler);

//handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "Not Found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "API Not Found",
      },
    ],
  });
  next();
});

export default app;
