import App from '@/app';
import PostResolver from '@resolvers/post.resolver';

const app = new App([PostResolver]);

app.listen();
