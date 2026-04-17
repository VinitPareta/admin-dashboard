import React, { startTransition, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Alert,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  ButtonGroup,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { clearPostMessage, createPost } from '../../../features/posts/postsSlice';
import Widget from '../../../components/Widget';
import s from './PostNew.module.scss';

const PostNew = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const createStatus = useAppSelector((state) => state.posts.createStatus);
  const message = useAppSelector((state) => state.posts.message);
  const error = useAppSelector((state) => state.posts.error);
  const [formState, setFormState] = useState({
    title: '',
    content: '',
  });

  useEffect(() => () => dispatch(clearPostMessage()), [dispatch]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const result = await dispatch(createPost(formState));

    if (createPost.fulfilled.match(result)) {
      setFormState({ title: '', content: '' });
      startTransition(() => {
        navigate('/app/posts', { replace: true });
      });
    }
  };

  return (
    <div className={s.root}>
      <Breadcrumb>
        <BreadcrumbItem>YOU ARE HERE</BreadcrumbItem>
        <BreadcrumbItem active>New Post</BreadcrumbItem>
      </Breadcrumb>
      <h1>Create new post</h1>
      <Row>
        <Col sm={6}>
          <Widget title={<span>Add Post <span className="fw-semi-bold">Form</span></span>}>
            <Form onSubmit={handleSubmit}>
              {message ? <Alert color="success">{message}</Alert> : null}
              {error ? <Alert color="danger">{error}</Alert> : null}
              <FormGroup>
                <Label for="input-title">Title</Label>
                <Input
                  id="input-title"
                  onChange={(event) =>
                    setFormState((current) => ({ ...current, title: event.target.value }))
                  }
                  placeholder="Title"
                  required
                  type="text"
                  value={formState.title}
                />
              </FormGroup>
              <FormGroup>
                <Label for="input-content">Content</Label>
                <textarea
                  className="form-control"
                  id="input-content"
                  onChange={(event) =>
                    setFormState((current) => ({ ...current, content: event.target.value }))
                  }
                  placeholder="Post content"
                  required
                  rows="6"
                  value={formState.content}
                />
              </FormGroup>
              <div className="d-flex justify-content-end">
                <ButtonGroup>
                  <Button color="default" onClick={() => navigate('/app/posts')} type="button">
                    Cancel
                  </Button>
                  <Button color="danger" type="submit">
                    {createStatus === 'loading' ? 'Creating...' : 'Create'}
                  </Button>
                </ButtonGroup>
              </div>
            </Form>
          </Widget>
        </Col>
      </Row>
    </div>
  );
};

export default PostNew;
