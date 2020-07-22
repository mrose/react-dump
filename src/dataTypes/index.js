import { Arr } from "./Arr";
import { Boolean } from "./Boolean";
import { CircularReference } from "./CircularReference";
import { Date } from "./Date";
import { Error } from "./Error";
import { Function } from "./Function";
import { Math } from "./Math";
import { Null } from "./Null";
import { Number } from "./Number";
import { Obj } from "./Obj";
import { RegExp } from "./RegExp";
import { String } from "./String";
import { Undefined } from "./Undefined";

const dataTypes = {
  Array:Arr,
  Boolean,
  CircularReference,
  Date,
  Error,
  Function,
  Math,
  Null,
  Number,
  Object:Obj,
  RegExp,
  String,
  Undefined
};
export { dataTypes };
