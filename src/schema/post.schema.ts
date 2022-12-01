import {Field, ObjectType} from "type-graphql";
import {getModelForClass, prop} from "@typegoose/typegoose";
import {Types} from "mongoose";

@ObjectType()
export class Post {
    @Field(() => String)
    _id: Types.ObjectId

    @Field(() => String)
    @prop({required: true})
    title: string;

    @Field(() => String)
    @prop({required: true})
    content: string;

    @Field(() => Boolean)
    @prop({required: true, default: false})
    deleteFlag: boolean;

    @Field(() => String)
    @prop({required: true})
    password: string;

    @Field(() => Date)
    @prop({required: true, default: Date.now()})
    createdDate: Date;

    @Field(() => Date)
    @prop({required: true, default: Date.now()})
    ModifiedDate: Date;
}

export const PostModel = getModelForClass(Post)