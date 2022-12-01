import {Field, InputType, ObjectType} from "type-graphql";
import {IsNumber, IsString} from "class-validator";
import {Post} from "@schema/post.schema";

@ObjectType()
export class PostPageInfoDto{
    @Field(() => Boolean)
    hasNextPage: boolean;

    @Field(() => String)
    endCursor: string;

    constructor(hasNextPage: boolean, endCursor: string) {
        this.hasNextPage = hasNextPage;
        this.endCursor = endCursor;
    }
}

@ObjectType()
export class PostListDto{
    @Field(() => [Post])
    posts: Post[];

    @Field(() => PostPageInfoDto)
    pageInfo: PostPageInfoDto;

    constructor(posts: Post[], pageInfo: PostPageInfoDto) {
        this.posts = posts;
        this.pageInfo = pageInfo;
    }
}


@InputType()
export class PostCreateDto {
    @Field()
    @IsString()
    title: string;

    @Field()
    @IsString()
    content: string;

    @Field()
    @IsString()
    password: string;
}

@InputType()
export class PostUpdateDto {
    @Field()
    @IsString()
    _id: string;

    @Field()
    @IsString()
    title: string;

    @Field()
    @IsString()
    content: string;

    @Field()
    @IsString()
    password: string;
}

@InputType()
export class PostDeleteDto {
    @Field()
    @IsString()
    _id: string;

    @Field()
    @IsString()
    password: string;
}

@InputType()
export class PostPaginationDto{
    @Field()
    @IsNumber()
    numPosts: number;

    @Field({nullable: true})
    @IsString()
    cursor: string;
}

@InputType()
export class PostDetailDto{
    @Field()
    @IsString()
    _id: string;
}