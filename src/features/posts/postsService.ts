import { seedPosts, type PostRecord } from './seedPosts';

export type { PostRecord } from './seedPosts';

const POSTS_STORAGE_KEY = 'dashboard.posts';

type NewPostInput = {
  title: string;
  content: string;
};

const delay = (ms: number) =>
  new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });

const sortPosts = (posts: PostRecord[]) =>
  [...posts].sort((left, right) => Date.parse(right.updatedAt) - Date.parse(left.updatedAt));

const readStoredPosts = (): PostRecord[] => {
  if (typeof window === 'undefined') {
    return seedPosts;
  }

  const rawValue = localStorage.getItem(POSTS_STORAGE_KEY);

  if (!rawValue) {
    localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(seedPosts));
    return seedPosts;
  }

  try {
    return sortPosts(JSON.parse(rawValue) as PostRecord[]);
  } catch {
    localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(seedPosts));
    return seedPosts;
  }
};

const persistPosts = (posts: PostRecord[]) => {
  localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(sortPosts(posts)));
};

export const listPosts = async (): Promise<PostRecord[]> => {
  await delay(250);
  return readStoredPosts();
};

export const createPostRecord = async ({ title, content }: NewPostInput): Promise<PostRecord> => {
  await delay(300);

  const nextPost: PostRecord = {
    id: crypto.randomUUID(),
    title: title.trim(),
    content: content.trim(),
    updatedAt: new Date().toISOString(),
  };

  const posts = [nextPost, ...readStoredPosts()];
  persistPosts(posts);

  return nextPost;
};
