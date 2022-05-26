import { useState, useEffect } from 'react';
import { BookmarkIcon, GroupsIcon, HomeIcon, SettingsIcon } from './Icons';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import TextAreaGroup from '../common/TextAreaGroup';
import { useSelector, useDispatch } from 'react-redux';
import { addPost } from '../../actions/postActions';

function SideBar() {
  const [current_user] = useState(
    useSelector((state) => state.auth.current_user)
  );
  const dispatch = useDispatch();
  const prof = useSelector((state) => state.profile.profile);
  const errors = useSelector((state) => state.errors);
  const [profile, setProfile] = useState({});
  const [show, setShow] = useState(false);
  const [showsm, setShowsm] = useState(false);
  const [post, setPost] = useState('');
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseSm = () => setShowsm(false);
  const handleShowSm = () => setShowsm(true);
  useEffect(() => {
    setProfile(prof);
  }, [prof]);
  const NewPost = () => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      width='2em'
      fill='#089447'
    >
      <path d='M0 0h24v24H0V0z' fill='none' />
      <path d='M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z' />
    </svg>
  );
  function onPost(e) {
    e.preventDefault();
    const newPost = {
      text: post,
      fname: current_user.fname,
      lname: current_user.lname,
      uname: profile.uname,
      date: new Date().toLocaleString(),
    };
    dispatch(addPost(newPost));
  }
  return (
    <div className='sidenav'>
      <OverlayTrigger
        defaultShow={false}
        key='right'
        placement='right'
        trigger='hover'
        overlay={
          <Tooltip id={`tooltip-right`} trigger='hover'>
            Hills ⛰
          </Tooltip>
        }
      >
        <div className='sidebar-icon group'>{<HomeIcon />}</div>
      </OverlayTrigger>
      <Divider />
      <OverlayTrigger
        show={false}
        defaultShow={false}
        key='right'
        placement='right'
        delay={{ show: 10, hide: 0 }}
        overlay={
          <Tooltip id={`tooltip-right`} trigger='hover'>
            New Post <i className='bi bi-plus'></i>
          </Tooltip>
        }
      >
        <div
          className='sidebar-icon group newpost-btn-sm'
          onClick={handleShowSm}
        >
          {<NewPost />}
        </div>
      </OverlayTrigger>
      <OverlayTrigger
        defaultShow={false}
        key='right'
        placement='right'
        trigger='hover'
        overlay={
          <Tooltip id={`tooltip-right`} trigger='hover'>
            New Post <i className='bi bi-plus'></i>
          </Tooltip>
        }
      >
        <div className='sidebar-icon group newpost-btn' onClick={handleShow}>
          {<NewPost />}
        </div>
      </OverlayTrigger>
      <OverlayTrigger
        key='right'
        placement='right'
        overlay={
          <Tooltip id={`tooltip-right`} trigger='hover'>
            Bookmarks <i className='bi bi-bookmarks'></i>
          </Tooltip>
        }
      >
        <div className='sidebar-icon group'>{<BookmarkIcon />}</div>
      </OverlayTrigger>
      <OverlayTrigger
        key='right'
        placement='right'
        overlay={
          <Tooltip id={`tooltip-right`} trigger='hover'>
            Groups <i className='bi bi-people'></i>
          </Tooltip>
        }
      >
        <div className='sidebar-icon group'>{<GroupsIcon />}</div>
      </OverlayTrigger>
      <Divider />
      <OverlayTrigger
        key='right'
        placement='right'
        overlay={
          <Tooltip id={`tooltip-right`} trigger='hover'>
            Settings <i className='bi bi-gear'></i>
          </Tooltip>
        }
      >
        <div className='sidebar-icon group'>{<SettingsIcon />}</div>
      </OverlayTrigger>
      <Modal show={show} dialogClassName={'text-success'} onHide={handleClose}>
        <form onSubmit={onPost}>
          <Modal.Header className='text-left' closeButton>
            <img src={current_user.avatar} alt='' className='avatar' /> &nbsp;
            &nbsp;
            <Modal.Title>What's happening?</Modal.Title>
          </Modal.Header>
          <Modal.Body className='text-dark'>
            <TextAreaGroup
              name='post'
              placeholder='Ooh gossip!'
              value={post}
              onChange={(e) => setPost(e.target.value)}
            />{' '}
          </Modal.Body>
          <Modal.Footer>
            <Button
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
              disabled={post === '' ? true : false}
              onClick={handleClose}
            >
              Post
            </Button>
          </Modal.Footer>
        </form>
      </Modal>

      <Modal show={showsm} centered onHide={handleCloseSm}>
        <form onSubmit={onPost}>
          <Modal.Header closeButton>
            <img src={current_user.avatar} alt='' className='avatar' /> &nbsp;
            &nbsp;
            <Modal.Title>What's happening?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <TextAreaGroup
              name='post'
              placeholder='Ooh gossip!'
              value={post}
              onChange={(e) => setPost(e.target.value)}
            />{' '}
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant='secondary'
              className='rounded-pill'
              onClick={handleCloseSm}
            >
              Cancel
            </Button>
            <Button
              type='submit'
              variant='primary'
              className='rounded-pill'
              disabled={post === '' ? true : false}
              onClick={handleCloseSm}
            >
              Post
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
}

const Divider = () => <hr className='sidebar-hr' />;
export default SideBar;
