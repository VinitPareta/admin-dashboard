import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbItem,
  Table,
} from 'reactstrap';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { fetchPosts } from '../../../features/posts/postsSlice';
import Widget from '../../../components/Widget';
import s from './PostList.module.scss';

const formatDate = (value) =>
  new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value));

const PostList = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.posts.items);
  const fetchStatus = useAppSelector((state) => state.posts.fetchStatus);

  useEffect(() => {
    if (fetchStatus === 'idle' && posts.length === 0) {
      dispatch(fetchPosts());
    }
  }, [dispatch, fetchStatus, posts.length]);

  return (
    <div className={s.root}>
      <Breadcrumb>
        <BreadcrumbItem>YOU ARE HERE</BreadcrumbItem>
        <BreadcrumbItem active>Posts</BreadcrumbItem>
      </Breadcrumb>
      <h1>Posts</h1>
      <Widget
        className="pb-0"
        title={(
          <div>
            <div className="pull-right mt-n-xs">
              <Link className="btn btn-sm btn-inverse" to="/app/posts/new">
                Create new
              </Link>
            </div>
            <h5 className="mt-0">
              Posts <span className="fw-semi-bold">List</span>
            </h5>
          </div>
        )}
      >
        <div className="widget-table-overflow">
          <Table striped>
            <thead>
              <tr>
                <th>Title</th>
                <th>Content</th>
                <th>Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id}>
                  <td>{post.title}</td>
                  <td>{post.content.slice(0, 80)}...</td>
                  <td>{formatDate(post.updatedAt)}</td>
                </tr>
              ))}
              {fetchStatus === 'loading' ? (
                <tr>
                  <td colSpan="3">Loading...</td>
                </tr>
              ) : null}
            </tbody>
          </Table>
        </div>
      </Widget>
    </div>
  );
};

export default PostList;
