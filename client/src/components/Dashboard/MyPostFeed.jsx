import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Animation from './animation';
import {
  getMyPosts,
  deletePost,
  addLike,
  addComment,
} from '../../actions/postActions';
import Popover from 'react-bootstrap/Popover';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Modal from 'react-bootstrap/Modal';
import TextAreaGroup from '../common/TextAreaGroup';

const MyPostFeed = ({ current_user, isAuthenticated, errors, profile }) => {
  let dashboardContent;
  const navigate = useNavigate();
  const { posts, loading } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [comment, setComment] = useState('');
  const [postId, setPostId] = useState('');
  const [text, setText] = useState('');
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    dispatch(getMyPosts());
  }, [dispatch]);
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
    if (errors === 'Unauthorized') {
      navigate('/');
    }
  }, [isAuthenticated, navigate, errors]);
  function onComment(e) {
    e.preventDefault();
    const newComment = {
      fname: current_user.fname,
      lname: current_user.lname,
      uname: profile.uname,
      avatar: current_user.avatar,
      date: new Date().toLocaleString(),
      comText: comment,
    };
    dispatch(addComment(postId, newComment));
    setComment('');
  }
  function onCommentShow(postId, text) {
    setPostId(postId);
    setText(text);
    handleShow();
  }
  if (posts === null || loading === true) {
    dashboardContent = (
      <div>
        <Animation />
      </div>
    );
  } else {
    if (Object.keys(posts).length > 0) {
      dashboardContent = (
        <>
          {posts.map((post) => {
            return (
              <>
                <Post
                  post={post}
                  dispatch={dispatch}
                  user={post.user}
                  fname={post.fname}
                  lname={post.lname}
                  date={post.date}
                  text={post.text}
                  avatar={current_user.avatar}
                  uname={profile.uname}
                  puname={post.uname}
                  postId={post._id}
                  userId={current_user.id}
                  likes={post.likes.length}
                  comments={post.comments.length}
                  onCommentShow={onCommentShow}
                />
              </>
            );
          })}
          <Modal show={show} onHide={handleClose}>
            <form onSubmit={onComment}>
              <Modal.Header closeButton>
                <img src={current_user.avatar} alt='' className='avatar' />{' '}
                &nbsp; &nbsp;
                <Modal.Title>
                  {current_user.fname} {current_user.lname} {current_user.uname}
                </Modal.Title>
                <div className='div post-text-container col-12'>
                  <p className='post-text w-auto'>{text}</p>
                </div>
              </Modal.Header>
              <Modal.Body>
                <TextAreaGroup
                  name='comment'
                  placeholder='Ofc you have a say in this'
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />{' '}
              </Modal.Body>
              <Modal.Footer>
                <Button
                  type='submit'
                  variant='secondary'
                  className='rounded-pill'
                  onClick={handleClose}
                >
                  Cancel
                </Button>
                <Button
                  type='submit'
                  variant='primary'
                  className='rounded-pill'
                  disabled={comment === '' ? true : false}
                  onClick={handleClose}
                >
                  Comment
                </Button>
              </Modal.Footer>
            </form>
          </Modal>
        </>
      );
    } else {
      dashboardContent = (
        <div>
          <h4 class='secondary-welcome-text'>
            What Are You Doing, {current_user.fname}? NO POSTS YET???
          </h4>
        </div>
      );
      if (!isAuthenticated) {
        navigate('/');
        dashboardContent = (
          <div>
            <h3 className='h3'>You need to be logged in to view ths page</h3>
            <Link
              to='/'
              className='btn btn-lg btn-primary hover:shadow-lg text-white'
            >
              Login
            </Link>
          </div>
        );
      } else {
      }
    }
  }
  return <>{dashboardContent}</>;
};

function Post({
  fname,
  lname,
  uname,
  date,
  text,
  avatar,
  postId,
  likes,
  comments,
  user,
  puname,
  dispatch,
  post,
  userId,
  onCommentShow,
}) {
  const deletePopover = (
    <Popover id='popover-basic' className='popover overflow-hidden'>
      <Popover.Body>
        <button
          className='link btn-md'
          onClick={() => dispatch(deletePost(postId))}
        >
          <i class='bi bi-trash-fill'></i> Delete
        </button>
      </Popover.Body>
    </Popover>
  );
  return (
    <div className='dark:border-gray-400 border-b border-gray-700'>
      <Link to={`posts/${postId}`}>
        <div className='post lg:w-3/4 lg:max-w-3/4 flex-row h-auto max-w-full mx-auto'>
          <Link to={`/profile/${uname}`}>
            <div className='avatar-wrapper'>
              <img src={avatar} alt='' className='avatar' />
            </div>
          </Link>
          <div className='post-content ml-2'>
            <div className='row flex-row w-full'>
              <div className='post-name-container col-lg-6 sm:col-7'>
                <Link to={`/profile/${uname}`}>
                  <p className='post-owner'>
                    {fname} {lname}
                  </p>
                </Link>
              </div>
              <div className='post-date-container col-lg-6 col-9'>
                <small className='timestamp'>{date}</small>
              </div>
            </div>
            <p className='post-uname'>
              <Link to={`/profile/${uname}`}>
                <small className='timestamp'>{uname}</small>
              </Link>
            </p>
            <div className='div post-text-container col-12'>
              <p className='post-text w-auto'>{text}</p>
            </div>
          </div>
        </div>
      </Link>
      <div className='post-buttons-container row flex-row w-full mx-auto mt-3'>
        <div className='like-button col-3 text-center'>
          <button
            className='btn-md btn-link'
            onClick={() => dispatch(addLike(postId))}
          >
            {post.likes.map((like) => like.user.toString()).indexOf(userId) !==
            -1 ? (
              <i class='bi bi-heart-fill fa-lg'></i>
            ) : (
              <i className='bi bi-heart fa-lg'></i>
            )}
          </button>
          &nbsp; &nbsp;
          <Link to={`/posts/likes/${postId}`}>{likes}</Link>
        </div>
        <div className='comment-button col-3 text-center'>
          <button
            className='btn-md btn-link'
            onClick={() => onCommentShow(postId, text)}
          >
            <i className='bi bi-chat fa-lg'></i>
          </button>
          &nbsp; &nbsp;
          <Link to={`/posts/comments/${postId}`}>{comments}</Link>
        </div>
        <div className='add-bookmark-button col-3 text-center'>
          <button className='btn-md btn-link'>
            <i className='bi bi-bookmark-plus fa-lg'></i>
          </button>
        </div>
        {user === userId ? (
          <div className='delete-post-button col-3 text-center'>
            <OverlayTrigger
              trigger='focus'
              placement='top'
              overlay={deletePopover}
            >
              <button className='btn-md btn-link'>
                <i class='bi bi-three-dots' tabindex='0'></i>
              </button>
            </OverlayTrigger>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default MyPostFeed;
