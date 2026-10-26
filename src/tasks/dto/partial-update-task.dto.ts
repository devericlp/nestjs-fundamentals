import { UpdateTaskDto } from "./update-task.dto";
import { PartialType } from "@nestjs/mapped-types";


export class PartialUpdateTaskDto extends PartialType(UpdateTaskDto) {}