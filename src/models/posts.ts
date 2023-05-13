import {
  DocumentType,
  Passthrough,
  Ref,
  getModelForClass,
  prop,
} from "@typegoose/typegoose";
import { Types } from "mongoose";
import { User } from "./users";

type Ingredient = { ingredient: string; amount: string };
type Step = { step: string; file: string };

export class Recipe {
  @prop({ ref: () => Post })
  public post: Ref<Post>;
  @prop({ ref: () => User })
  public author: Ref<User>;
  @prop()
  public title: string;
  @prop()
  public description: string;
  @prop({ default: "00:00" })
  public prepTime: string;
  @prop({ default: "00:00" })
  public cookTime: string;
  @prop({ default: 0 })
  public servings: number;
  @prop({
    type: () => new Passthrough({ ingredient: String, amount: String }, true),
    default: [],
  })
  public ingredients: Ingredient[];
  @prop({
    type: () => new Passthrough({ step: String, file: String }, true),
    default: [],
  })
  public steps: Step[];
}

export class Post {
  @prop({ ref: () => User, required: true })
  public author!: Ref<User>;
  @prop({ ref: () => Recipe, required: true })
  public recipe!: Ref<Recipe>;
  @prop()
  public title: string;
  @prop()
  public description: string;
  @prop()
  public cover: string;
  @prop({ type: String, required: true, default: [] })
  public files: Types.Array<string>;
  @prop({ type: String, required: true, default: [] })
  public hashtags: Types.Array<string>;
  @prop()
  public category: string;
  @prop({ default: 0 })
  public likes: number;
  @prop({ default: 0 })
  public comments: number;
  @prop({ type: Types.ObjectId, default: [] })
  public mentions: Types.Array<Types.ObjectId>;
  @prop({
    type: () =>
      new Passthrough(
        { name: String, coords: { lat: Number, lon: Number } },
        true
      ),
    default: [],
  })
  public location: { name: string; coords: { lat: number; lon: number } };
}

export type RecipeDocument = DocumentType<Recipe>;
export type PostDocument = DocumentType<Post>;
