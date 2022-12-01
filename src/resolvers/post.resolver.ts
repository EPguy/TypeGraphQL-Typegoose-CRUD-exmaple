import {Arg, Mutation, Query, Resolver} from "type-graphql";
import PostService from "@service/post.service";
import {Post} from "@schema/post.schema";
import {
    PostCreateDto,
    PostDeleteDto,
    PostDetailDto,
    PostListDto,
    PostPaginationDto,
    PostUpdateDto
} from "@dto/post.dto";

@Resolver()
export default class PostResolver {
    constructor(private postService : PostService) {
        this.postService = new PostService();
    }

    @Query(() => Post)
    postFindById(@Arg("post") post: PostDetailDto) {
        return this.postService.postDetail(post);
    }

    @Query(() => PostListDto)
    postFindList(@Arg("post") post: PostPaginationDto) {
        return this.postService.postFindPagination(post);
    }

    @Mutation(() => Post)
    postCreate(@Arg("post") post: PostCreateDto) {
        return this.postService.postCreate(post);
    }

    @Mutation(() => Post)
    postUpdate(@Arg("post") post: PostUpdateDto) {
        return this.postService.postUpdate(post);
    }

    @Mutation(() => Post)
    postDelete(@Arg("post") post: PostDeleteDto) {
        return this.postService.postDelete(post);
    }
}