import { Router, type IRouter } from "express";
import healthRouter from "./health";
import dtcRouter from "./dtc";
import symptomsRouter from "./symptoms";

const router: IRouter = Router();

router.use(healthRouter);
router.use(dtcRouter);
router.use(symptomsRouter);

export default router;
