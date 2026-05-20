import { type SchemaTypeDefinition } from "sanity";
import { post } from "./post";
import { category } from "./category";
import { project } from "./project";
import { product } from "./product";
import { aboutMe } from "./aboutMe";

export const schemaTypes: SchemaTypeDefinition[]  = 
	 [aboutMe, post, category, project, product]
;
