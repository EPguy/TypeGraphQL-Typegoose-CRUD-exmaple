import {PostModel} from "@schema/post.schema";
import {
    PostCreateDto,
    PostDeleteDto, PostDetailDto,
    PostListDto,
    PostPageInfoDto,
    PostPaginationDto,
    PostUpdateDto
} from "@dto/post.dto";
import { hash, compare } from 'bcrypt';
import {HttpException} from "@exceptions/HttpException";

export default class PostService {
    async postCreate(post: PostCreateDto) {
        const hashedPassword = await hash(post.password, 10);
        const createPost =  PostModel.create({...post, password: hashedPassword})
        return createPost;
    }

    async postUpdate(post: PostUpdateDto) {
        const findPost = await PostModel.findById(post._id);
        const isPasswordCorrect = await compare(post.password, findPost.password);
        if(!isPasswordCorrect) throw new HttpException(400, "Password incorrect.");

        const updatePost = await PostModel.findOneAndUpdate({_id: post._id},{$set: {title: post.title, content: post.content, ModifiedDate: Date.now()}});
        return updatePost;
    }

    async postDelete(post: PostDeleteDto) {
        const findPost = await PostModel.findById(post._id);
        const isPasswordCorrect = await compare(post.password, findPost.password);
        if(!isPasswordCorrect) throw new HttpException(400, "Password incorrect.");

        const deletePost = await PostModel.findOneAndUpdate({_id: post._id},{$set: {deleteFlag: true, ModifiedDate: Date.now()}});
        return deletePost;
    }

    async postFindPagination(post: PostPaginationDto) {
        let filterQuery = {};
        if(post.cursor) {
            filterQuery = {
                deleteFlag: false,
                _id : { $gt: post.cursor }
            }
        }
        const posts = await PostModel.find(filterQuery).sort({
            _id: -1
        }).limit(post.numPosts)

        const next = posts[posts.length - 1]._id
        const hasNextPage = await PostModel.count({
            deleteFlag: false,
            _id: { $gt: next }
        }) > 0
        const postPageInfo = new PostPageInfoDto(hasNextPage, next.toString());
        const postList = new PostListDto(posts, postPageInfo);

        return postList;
    }

    async postDetail(post: PostDetailDto) {
        const detailPost = await PostModel.findById(post._id);
        return detailPost;
    }
}
